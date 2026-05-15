const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Configure Cloudinary (reusing same credentials as materialRoutes)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config (memory storage)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  }
});

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    if (!process.env.CLOUDINARY_API_KEY) {
       return res.status(500).json({ message: 'Cloudinary not configured.' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'prepinsight-chat-images',
        resource_type: 'image',
        transformation: [
          { width: 800, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Failed to upload to Cloudinary' });
        }
        // Return the Cloudinary secure URL as imageUrl
        res.status(200).json({ imageUrl: result.secure_url });
      }
    );

    Readable.from(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

module.exports = router;
