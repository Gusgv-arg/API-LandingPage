import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY_CHATGPT;

const openai = new OpenAI({
  apiKey: API_KEY,
});

export const embeddingServicesChatGpt = async function (knowledgeBase) {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: knowledgeBase,
  });
  return embedding;
};
