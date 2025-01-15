import multer from "multer";
import path from "path";

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Directory to store files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, file.fieldname + "-" + Date.now() + ext); // File name
  },
});

// Filter file types for images and documents
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|pdf|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, png, jpg) and PDFs are allowed!"));
  }
};

// Initialize multer with the storage and file filter
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});
