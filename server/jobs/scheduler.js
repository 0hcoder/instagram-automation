// backend/jobs/scheduler.js
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { postVideoToInstagram } = require('../services/instagramService');

const SCHEDULE_FILE = path.join(__dirname, '..', 'scheduledPosts.json');

function loadScheduledPosts() {
  if (!fs.existsSync(SCHEDULE_FILE)) return [];
  return JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf-8'));
}

function saveScheduledPosts(posts) {
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(posts, null, 2));
}

function schedulePosts() {
  cron.schedule('* * * * *', async () => {
    const posts = loadScheduledPosts();
    const now = new Date();

    for (const post of posts) {
      if (!post.posted && new Date(post.scheduledAt) <= now) {
        try {
          await postVideoToInstagram(post);
          post.posted = true;
          console.log(`Posted video ${post.videoUrl} at ${new Date()}`);
        } catch (err) {
          console.error('Failed to post:', err.message);
        }
      }
    }

    saveScheduledPosts(posts);
  });
}

module.exports = { schedulePosts, loadScheduledPosts, saveScheduledPosts };
