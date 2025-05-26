const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/generate', async (req, res) => {
  const { videoTitle, description } = req.body;

  try {
    const prompt = `Generate an engaging Instagram caption and relevant hashtags for a video titled "${videoTitle}" with the following description: "${description}".`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    const generatedText = response.data.choices[0].text.trim();
    const [caption, hashtags] = generatedText.split('\n');

    res.json({ caption, hashtags });
  } catch (error) {
    console.error('Error generating caption:', error.message);
    res.status(500).json({ error: 'Failed to generate caption' });
  }
});

module.exports = router;
