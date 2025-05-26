const express = require('express');
const app = express();
const captionRoutes = require('./routes/captionRoutes.js');

app.use(express.json());
app.use('/api/captions', captionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
