import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express'; // Ensure you're importing Request from express

// Define storage options for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the 'uploads' directory
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Use the original filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only PDFs
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only PDFs are allowed.'));
  }
};

// Set up multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
