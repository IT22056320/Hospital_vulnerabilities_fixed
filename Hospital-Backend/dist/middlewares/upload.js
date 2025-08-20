"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define storage options for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Save files to the 'uploads' directory
        cb(null, path_1.default.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        // Use the original filename
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error('Invalid file type. Only PDFs are allowed.'));
    }
};
// Set up multer upload instance
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
exports.default = upload;
