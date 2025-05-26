
const express = require('express');
const cors = require('cors');
const videoRoutes = require('./routes/videoRoutes.js');
const captionRoutes = require('./routes/captionRoutes.js');
const instagramRoutes = require('./routes/instagramRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/videos', videoRoutes);
app.use('/api/captions', captionRoutes);
app.use('/api/instagram', instagramRoutes);

app.use(errorHandler);

module.exports = app;
