// backend/services/instagramService.js
const axios = require('axios');

async function postVideoToInstagram({ videoUrl, caption, accessToken, instagramAccountId }) {
  try {
    // Step 1: Upload Video Container
    const containerRes = await axios.post(
      `https://graph.facebook.com/v15.0/${instagramAccountId}/media`,
      {
        video_url: videoUrl,
        caption,
        access_token: accessToken,
        media_type: 'VIDEO',
      }
    );

    const creationId = containerRes.data.id;

    // Step 2: Publish the Container
    const publishRes = await axios.post(
      `https://graph.facebook.com/v15.0/${instagramAccountId}/media_publish`,
      {
        creation_id: creationId,
        access_token: accessToken,
      }
    );

    return publishRes.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message);
  }
}

module.exports = { postVideoToInstagram };
