// backend/controllers/videoController.js
exports.uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ filename: req.file.filename, path: req.file.path });
};
