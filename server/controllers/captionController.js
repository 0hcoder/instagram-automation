// backend/controllers/captionController.js
const { generateCaptionAndHashtags } = require('../services/openaiService');

exports.getCaption = async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: 'Description is required' });

    const caption = await generateCaptionAndHashtags(description);
    res.json({ caption });
  } catch (error) {
    next(error);
  }
};
