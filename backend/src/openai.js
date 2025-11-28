import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getSystemPrompt = () => {
  try {
    const promptPath = path.join(__dirname, 'system_prompt.txt');
    return fs.readFileSync(promptPath, 'utf8');
  } catch (error) {
    console.error('Error reading system prompt:', error);
    return 'You are a helpful assistant.'; // Fallback
  }
};

export const generateResponse = async (message, history = []) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Cost Optimization: Limit Input History (but allow full length)
    const recentHistory = history.slice(-6); // Keep last 6 exchanges for better context

    // Convert DynamoDB history to OpenAI format
    const messages = [
      { role: 'system', content: getSystemPrompt() },
      ...recentHistory.map(item => ([
        { role: 'user', content: item.userMessage },
        { role: 'assistant', content: item.aiResponse }
      ])).flat(),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective and fast
      messages: messages,
      max_completion_tokens: 500, // Increased limit to prevent mid-sentence cutoffs
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Failed to generate response');
  }
};
