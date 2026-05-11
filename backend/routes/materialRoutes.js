const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { Readable } = require('stream');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // max 100MB
  },
});

// Get all materials
router.get('/', protect, async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_API_KEY) {
      return res.status(500).json({ message: 'Cloudinary not configured.' });
    }
    // Use Admin API instead of Search API to avoid indexing delays for newly uploaded materials
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'prepinsight-materials/',
      max_results: 500,
      context: true,
      tags: true
    });
    
    // Sort by created_at descending (Admin API doesn't sort by created_at desc by default)
    const sortedResources = result.resources.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
    const materials = sortedResources.map((file) => ({
      id: file.public_id,
      url: file.secure_url,
      format: file.format,
      resource_type: file.resource_type,
      created_at: file.created_at,
      bytes: file.bytes,
      context: file.context ? (file.context.custom || file.context) : {},
    }));
    
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ message: 'Failed to fetch materials' });
  }
});

// Upload material
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { subject, title, fileType, uploaderName } = req.body;
    
    // Cloudinary resource_type determination
    let resource_type = 'auto';
    if (fileType === 'pdf') resource_type = 'raw';
    else if (fileType === 'video') resource_type = 'video';
    else if (fileType === 'image') resource_type = 'image';

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'prepinsight-materials',
        resource_type: resource_type,
        context: {
          subject: subject || 'General',
          uploadedBy: uploaderName || (req.user && req.user.name) || 'Unknown',
          uploadedById: (req.user && req.user._id) ? req.user._id.toString() : 'Unknown',
          title: title || 'Untitled Material',
          fileType: fileType || 'unknown'
        }
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Failed to upload to Cloudinary' });
        }
        res.status(201).json({
          message: 'Material uploaded successfully',
          data: {
            id: result.public_id,
            url: result.secure_url,
            format: result.format,
            resource_type: result.resource_type,
            created_at: result.created_at,
            context: result.context ? result.context.custom : {},
          }
        });
      }
    );

    Readable.from(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Error uploading material:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

// Update metadata
router.put('/:id', protect, async (req, res) => {
  try {
    const public_id = decodeURIComponent(req.params.id);
    const { title, subject } = req.body;

    // We must first verify the user is the owner.
    // So we fetch the resource
    const resource = await cloudinary.api.resource(public_id, { context: true });
    
    if (resource.context?.custom?.uploadedById !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this material' });
    }

    // Keep existing context, just update title and subject
    const currentContext = resource.context?.custom || {};
    const newContext = {
      subject: subject || currentContext.subject || 'General',
      uploadedBy: currentContext.uploadedBy || 'Unknown',
      uploadedById: currentContext.uploadedById || 'Unknown',
      title: title || currentContext.title || 'Untitled Material',
      fileType: currentContext.fileType || 'unknown'
    };

    await cloudinary.api.update(public_id, { context: newContext });
    res.json({ message: 'Metadata updated successfully' });

  } catch (error) {
    console.error('Error updating material:', error);
    res.status(500).json({ message: 'Failed to update material metadata' });
  }
});

// Delete material
router.delete('/:id', protect, async (req, res) => {
  try {
    const public_id = decodeURIComponent(req.params.id);

    const resource = await cloudinary.api.resource(public_id, { context: true });
    
    if (resource.context?.custom?.uploadedById !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this material' });
    }

    await cloudinary.uploader.destroy(public_id, { resource_type: resource.resource_type });
    res.json({ message: 'Material deleted successfully' });

  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ message: 'Failed to delete material' });
  }
});

module.exports = router;
