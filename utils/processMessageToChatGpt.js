import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY_CHATGPT;

async function processMessageToChatGPT(message) {
  const systemMessage = {
    role: 'system',
    content: 'Actuá como si fueras responsable de atención al cliente',
  };

  try {
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      //model: "davinci:ft-personal:mi-modelo-2023-08-30-18-39-06",
      messages: [systemMessage, ...message], //en messages recibe un array de objetos con lo msjes desde el front
    };
    const request = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    };

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      request,
    );
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}

export default processMessageToChatGPT;
