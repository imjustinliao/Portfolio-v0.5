import { saveConversation, getSessionHistory } from './dynamodb.js';
import { generateResponse } from './openai.js';

const SECRET_HEADER = process.env.CLOUDFRONT_SECRET;

export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event));

  // ========================================================================
  // 1. SECURITY: Verify Secret Handshake
  // ========================================================================
  const headers = event.headers || {};
  // Headers are case-insensitive in API Gateway / Lambda URL usually, but let's be safe
  const requestSecret = headers['x-origin-verify'] || headers['X-Origin-Verify'];

  if (requestSecret !== SECRET_HEADER) {
    console.warn('Security Alert: Unauthorized access attempt detected.');
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden: Access Denied' }),
    };
  }

  // ========================================================================
  // 2. Parse Input
  // ========================================================================
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  const { message, sessionId, userName } = body;

  if (!message || !sessionId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing message or sessionId' }),
    };
  }

  // Get User IP (CloudFront passes this header)
  const userIp = headers['cloudfront-viewer-address'] || headers['x-forwarded-for'] || 'Unknown';

  // Get User Location (CloudFront headers)
  const city = headers['cloudfront-viewer-city'];
  const country = headers['cloudfront-viewer-country-name'];
  const userLocation = city && country ? `${city}, ${country}` : (country || 'Unknown');

  // ========================================================================
  // 3. Process Chat
  // ========================================================================
  try {
    // Get context
    const history = await getSessionHistory(sessionId);
    
    // Generate AI response
    const aiResponse = await generateResponse(message, history);
    
    // Save to DB
    await saveConversation(sessionId, message, aiResponse, userName, userIp, userLocation);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: aiResponse }),
    };
  } catch (error) {
    console.error('Handler Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
