// backend/routes/videoRoutes.js
const express = require('express');
const { uploadVideo } = require('../controllers/videoController.js');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max size
  fileFilter: (req, file, cb) => {
    const allowed = ['.mp4', '.mov', '.avi'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

router.post('/upload', upload.single('video'), uploadVideo);

module.exports = router;
