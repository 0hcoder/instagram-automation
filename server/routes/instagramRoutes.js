// backend/routes/instagramRoutes.js
const express = require('express');
const { schedulePost } = require('../controllers/instagramController');
const router = express.Router();

router.post('/schedule', schedulePost);

module.exports = router;
