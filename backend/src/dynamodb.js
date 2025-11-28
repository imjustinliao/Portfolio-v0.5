import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

export const saveConversation = async (sessionId, userMessage, aiResponse, userName, userIp, userLocation) => {
  const timestamp = Date.now();
  
  const item = {
    sessionId,
    timestamp,
    userMessage,
    aiResponse,
    userName: userName || 'Anonymous',
    userIp: userIp || 'Unknown',
    userLocation: userLocation || 'Unknown',
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: item,
    }).promise();
    console.log(`Saved conversation for session ${sessionId}`);
  } catch (error) {
    console.error('Error saving to DynamoDB:', error);
    // Don't fail the request if logging fails
  }
};

export const getSessionHistory = async (sessionId) => {
  try {
    const result = await dynamoDB.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'sessionId = :sid',
      ExpressionAttributeValues: {
        ':sid': sessionId,
      },
      ScanIndexForward: true, // Oldest first
      Limit: 10, // Limit context window
    }).promise();
    
    return result.Items || [];
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};
