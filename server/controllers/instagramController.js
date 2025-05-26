// backend/controllers/instagramController.js
const path = require('path');
const { loadScheduledPosts, saveScheduledPosts } = require('../jobs/scheduler');

exports.schedulePost = (req, res) => {
  const { videoUrl, caption, scheduledAt } = req.body;
  if (!videoUrl || !caption || !scheduledAt) {
    return res.status(400).json({ error: 'videoUrl, caption, and scheduledAt required' });
  }

  const posts = loadScheduledPosts();

  posts.push({
    videoUrl,
    caption,
    scheduledAt,
    posted: false,
  });

  saveScheduledPosts(posts);
  res.json({ success: true, message: 'Post scheduled' });
};
