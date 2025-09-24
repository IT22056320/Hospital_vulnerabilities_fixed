/**
 * Comprehensive Input Validation and XSS Prevention Utilities
 * 
 * This module provides security-focused validation functions to prevent:
 * - XSS (Cross-Site Scripting) attacks
 * - SQL Injection attempts
 * - HTML injection
 * - Script injection
 * - Buffer overflow attacks
 */

import DOMPurify from 'dompurify';

// Security patterns to detect malicious inputs
const MALICIOUS_PATTERNS = {
  // XSS patterns
  XSS_SCRIPT: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  XSS_JAVASCRIPT: /javascript:/gi,
  XSS_VBSCRIPT: /vbscript:/gi,
  XSS_ONLOAD: /on\w+\s*=/gi,
  XSS_EXPRESSION: /expression\s*\(/gi,
  
  // SQL injection patterns
  SQL_UNION: /(\bunion\b|\bselect\b|\binsert\b|\bdelete\b|\bdrop\b|\bupdate\b)/gi,
  SQL_COMMENT: /(--|\#|\/\*|\*\/)/g,
  SQL_QUOTES: /('|(\\')|(;))/g,
  
  // HTML injection patterns
  HTML_TAGS: /<[^>]*>/g,
  HTML_ENTITIES: /&[a-zA-Z][a-zA-Z0-9]*;/g,
  
  // Command injection patterns
  COMMAND_INJECTION: /(\|\||&&|\||&|;|\$\(|\`)/g,
};

// Input length limits for different field types
export const INPUT_LIMITS = {
  NAME: 100,
  EMAIL: 254,
  PASSWORD: 128,
  PHONE: 20,
  ADDRESS: 500,
  DESCRIPTION: 1000,
  MEDICAL_NOTES: 2000,
  GENERAL_TEXT: 255,
  NUMERIC_STRING: 50,
  ID_FIELD: 100,
};

/**
 * Sanitizes input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Use DOMPurify to sanitize HTML content
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true // Keep text content
  });
  
  return sanitized.trim();
};

/**
 * Encodes HTML entities to prevent HTML injection
 */
export const encodeHtmlEntities = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Detects potentially malicious patterns in input
 */
export const detectMaliciousInput = (input: string): string[] => {
  if (!input || typeof input !== 'string') return [];
  
  const threats: string[] = [];
  
  // Check for XSS patterns
  if (MALICIOUS_PATTERNS.XSS_SCRIPT.test(input)) threats.push('Script tag detected');
  if (MALICIOUS_PATTERNS.XSS_JAVASCRIPT.test(input)) threats.push('JavaScript protocol detected');
  if (MALICIOUS_PATTERNS.XSS_VBSCRIPT.test(input)) threats.push('VBScript protocol detected');
  if (MALICIOUS_PATTERNS.XSS_ONLOAD.test(input)) threats.push('Event handler detected');
  if (MALICIOUS_PATTERNS.XSS_EXPRESSION.test(input)) threats.push('CSS expression detected');
  
  // Check for SQL injection patterns
  if (MALICIOUS_PATTERNS.SQL_UNION.test(input)) threats.push('SQL keywords detected');
  if (MALICIOUS_PATTERNS.SQL_COMMENT.test(input)) threats.push('SQL comment detected');
  
  // Check for command injection
  if (MALICIOUS_PATTERNS.COMMAND_INJECTION.test(input)) threats.push('Command injection pattern detected');
  
  return threats;
};

/**
 * Validates and sanitizes text input
 */
export const validateTextInput = (
  input: string,
  maxLength: number = INPUT_LIMITS.GENERAL_TEXT,
  allowSpecialChars: boolean = false
): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!input || typeof input !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Input is required'] };
  }
  
  // Check length
  if (input.length > maxLength) {
    errors.push(`Input must be ${maxLength} characters or less`);
  }
  
  // Detect malicious patterns
  const threats = detectMaliciousInput(input);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  // Sanitize input
  const sanitized = sanitizeInput(input);
  
  // Additional pattern validation
  if (!allowSpecialChars) {
    // Only allow letters, numbers, spaces, and basic punctuation
    const validPattern = /^[a-zA-Z0-9\s\.\,\!\?\-\(\)]+$/;
    if (!validPattern.test(sanitized)) {
      errors.push('Input contains invalid characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Validates email addresses
 */
export const validateEmail = (email: string): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!email || typeof email !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Email is required'] };
  }
  
  // Length check
  if (email.length > INPUT_LIMITS.EMAIL) {
    errors.push(`Email must be ${INPUT_LIMITS.EMAIL} characters or less`);
  }
  
  // Sanitize
  const sanitized = sanitizeInput(email);
  
  // Email pattern validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(sanitized)) {
    errors.push('Invalid email format');
  }
  
  // Security check
  const threats = detectMaliciousInput(sanitized);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Validates names (person names, drug names, etc.)
 */
export const validateName = (name: string): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!name || typeof name !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Name is required'] };
  }
  
  // Length check
  if (name.length > INPUT_LIMITS.NAME) {
    errors.push(`Name must be ${INPUT_LIMITS.NAME} characters or less`);
  }
  
  // Sanitize
  const sanitized = sanitizeInput(name);
  
  // Name pattern validation (letters, spaces, hyphens, apostrophes)
  const namePattern = /^[a-zA-Z\s\-\'\.]+$/;
  if (!namePattern.test(sanitized)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }
  
  // Security check
  const threats = detectMaliciousInput(sanitized);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Validates password strength and security
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!password || typeof password !== 'string') {
    return { isValid: false, errors: ['Password is required'] };
  }
  
  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > INPUT_LIMITS.PASSWORD) {
    errors.push(`Password must be ${INPUT_LIMITS.PASSWORD} characters or less`);
  }
  
  // Strength requirements
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Security check (but don't sanitize passwords)
  const threats = detectMaliciousInput(password);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates phone numbers
 */
export const validatePhone = (phone: string): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Phone number is required'] };
  }
  
  // Length check
  if (phone.length > INPUT_LIMITS.PHONE) {
    errors.push(`Phone number must be ${INPUT_LIMITS.PHONE} characters or less`);
  }
  
  // Sanitize
  const sanitized = sanitizeInput(phone);
  
  // Sri Lankan phone number pattern
  const phonePattern = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;
  if (!phonePattern.test(sanitized)) {
    errors.push('Invalid Sri Lankan phone number format');
  }
  
  // Security check
  const threats = detectMaliciousInput(sanitized);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Validates numeric inputs
 */
export const validateNumeric = (
  value: string,
  min?: number,
  max?: number
): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!value || typeof value !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Value is required'] };
  }
  
  // Sanitize
  const sanitized = sanitizeInput(value);
  
  // Check if numeric
  const numValue = parseFloat(sanitized);
  if (isNaN(numValue)) {
    errors.push('Value must be a valid number');
  } else {
    if (min !== undefined && numValue < min) {
      errors.push(`Value must be at least ${min}`);
    }
    if (max !== undefined && numValue > max) {
      errors.push(`Value must be at most ${max}`);
    }
  }
  
  // Security check
  const threats = detectMaliciousInput(sanitized);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Validates medical text (symptoms, diagnosis, notes)
 */
export const validateMedicalText = (text: string): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!text || typeof text !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Medical text is required'] };
  }
  
  // Length check
  if (text.length > INPUT_LIMITS.MEDICAL_NOTES) {
    errors.push(`Text must be ${INPUT_LIMITS.MEDICAL_NOTES} characters or less`);
  }
  
  // Sanitize
  const sanitized = sanitizeInput(text);
  
  // Allow medical terminology with special characters
  const medicalPattern = /^[a-zA-Z0-9\s\.\,\!\?\-\(\)\[\]\+\*\/\%\:\;]+$/;
  if (!medicalPattern.test(sanitized)) {
    errors.push('Text contains invalid characters for medical data');
  }
  
  // Security check
  const threats = detectMaliciousInput(sanitized);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Validates date inputs
 */
export const validateDate = (date: string): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = [];
  
  if (!date || typeof date !== 'string') {
    return { isValid: false, sanitized: '', errors: ['Date is required'] };
  }
  
  // Sanitize
  const sanitized = sanitizeInput(date);
  
  // Date pattern validation (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(sanitized)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }
  
  // Check if valid date
  const dateObj = new Date(sanitized);
  if (isNaN(dateObj.getTime())) {
    errors.push('Invalid date');
  }
  
  // Security check
  const threats = detectMaliciousInput(sanitized);
  if (threats.length > 0) {
    errors.push(`Security threat detected: ${threats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  };
};

/**
 * Real-time input sanitizer for React onChange events
 */
export const createSecureChangeHandler = (
  originalHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  validator: (value: string) => { isValid: boolean; sanitized: string; errors: string[] }
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    const result = validator(value);
    
    // Update the input value with sanitized content
    e.target.value = result.sanitized;
    
    // Log security threats (in production, send to security monitoring)
    if (!result.isValid && result.errors.some(error => error.includes('Security threat'))) {
      console.warn('Security threat detected in input:', result.errors);
      // TODO: In production, send to security monitoring system
    }
    
    // Call original handler
    originalHandler(e);
  };
};

export default {
  sanitizeInput,
  encodeHtmlEntities,
  detectMaliciousInput,
  validateTextInput,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateNumeric,
  validateMedicalText,
  validateDate,
  createSecureChangeHandler,
  INPUT_LIMITS,
};