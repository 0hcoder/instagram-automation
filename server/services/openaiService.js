// backend/services/openaiService.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateCaptionAndHashtags(videoDescription) {
  const prompt = `Generate an engaging Instagram caption and relevant hashtags for a video described as: "${videoDescription}"`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 60,
    temperature: 0.7,
  });

  return response.data.choices[0].text.trim();
}

module.exports = { generateCaptionAndHashtags };
