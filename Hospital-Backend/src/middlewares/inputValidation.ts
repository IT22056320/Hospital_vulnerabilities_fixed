import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { body, param, validationResult } from 'express-validator';

// Input sanitization utility
export class InputSanitizer {
  /**
   * Sanitize MongoDB ObjectId to prevent NoSQL injection
   */
  static sanitizeObjectId(id: string): string | null {
    if (!id || typeof id !== 'string') {
      return null;
    }
    
    // Remove any non-alphanumeric characters except hyphens
    const sanitized = id.replace(/[^a-fA-F0-9]/g, '');
    
    // Validate ObjectId format (24 characters hex)
    if (sanitized.length !== 24 || !mongoose.Types.ObjectId.isValid(sanitized)) {
      return null;
    }
    
    return sanitized;
  }

  /**
   * Sanitize general user input to prevent injection attacks
   */
  static sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }
    
    // Remove potentially dangerous characters
    return input
      .replace(/[<>'";&${}()]/g, '') // Remove HTML/JS injection chars
      .replace(/\$where/gi, '') // Remove MongoDB $where operator
      .replace(/\$ne/gi, '') // Remove MongoDB $ne operator
      .replace(/\$or/gi, '') // Remove MongoDB $or operator
      .replace(/\$and/gi, '') // Remove MongoDB $and operator
      .replace(/\$regex/gi, '') // Remove MongoDB $regex operator
      .trim();
  }

  /**
   * Validate and sanitize URL to prevent SSRF attacks
   */
  static validateUrl(url: string, allowedHosts: string[] = ['localhost', '127.0.0.1']): string | null {
    if (!url || typeof url !== 'string') {
      return null;
    }

    try {
      const parsedUrl = new URL(url);
      
      // Only allow HTTP/HTTPS protocols
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return null;
      }

      // Check if hostname is in allowlist
      const isAllowed = allowedHosts.some(host => 
        parsedUrl.hostname === host || 
        parsedUrl.hostname.endsWith(`.${host}`)
      );

      if (!isAllowed) {
        return null;
      }

      // Prevent access to internal/private IP ranges
      const ip = parsedUrl.hostname;
      const privateIpRegex = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|169\.254\.|::1|localhost)$/;
      
      if (privateIpRegex.test(ip) && !allowedHosts.includes(ip)) {
        return null;
      }

      return parsedUrl.href;
    } catch (error) {
      return null;
    }
  }
}

// Validation middleware for appointment endpoints
export const validateAppointmentId = [
  param('id').custom((value) => {
    const sanitized = InputSanitizer.sanitizeObjectId(value);
    if (!sanitized) {
      throw new Error('Invalid appointment ID format');
    }
    return true;
  }),
];

export const validateStaffId = [
  param('staffId').custom((value) => {
    const sanitized = InputSanitizer.sanitizeObjectId(value);
    if (!sanitized) {
      throw new Error('Invalid staff ID format');
    }
    return true;
  }),
];

export const validateAppointmentData = [
  body('patientName')
    .isString()
    .isLength({ min: 1, max: 100 })
    .custom((value) => {
      return InputSanitizer.sanitizeString(value) === value;
    })
    .withMessage('Patient name contains invalid characters'),
  
  body('staffId')
    .custom((value) => {
      const sanitized = InputSanitizer.sanitizeObjectId(value);
      if (!sanitized) {
        throw new Error('Invalid staff ID format');
      }
      return true;
    }),
  
  body('date')
    .isISO8601()
    .withMessage('Invalid date format'),
    
  body('time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM)'),
    
  body('reason')
    .isString()
    .isLength({ min: 1, max: 500 })
    .custom((value) => {
      return InputSanitizer.sanitizeString(value) === value;
    })
    .withMessage('Reason contains invalid characters'),
    
  body('status')
    .isIn(['Active', 'Canceled', 'Completed'])
    .withMessage('Invalid status. Must be Active, Canceled, or Completed'),
];

// Error handling middleware
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg
      }))
    });
    return;
  }
  
  // Sanitize parameters after validation
  if (req.params.id) {
    req.params.id = InputSanitizer.sanitizeObjectId(req.params.id) || '';
  }
  if (req.params.staffId) {
    req.params.staffId = InputSanitizer.sanitizeObjectId(req.params.staffId) || '';
  }
  
  next();
};

// SSRF protection middleware for external requests
export const validateExternalUrl = (allowedHosts: string[] = ['localhost', '127.0.0.1']) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.url) {
      const validatedUrl = InputSanitizer.validateUrl(req.body.url, allowedHosts);
      if (!validatedUrl) {
        res.status(400).json({
          message: 'Invalid or unauthorized URL'
        });
        return;
      }
      req.body.url = validatedUrl;
    }
    next();
  };
};