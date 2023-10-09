import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY_CHATGPT;

const openai = new OpenAI({
  apiKey: API_KEY,
});

export const processMessageToMyChatGpt = async function (messages) {
  try {
    const response = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0613:personal:mi-modelo-ultimo:7vTFLRhT',
      //model: "gpt-3.5-turbo",
      messages: messages.map((message) => message),
      max_tokens: 500,
      temperature: 0,
      stop: 'END',
    });
    //console.log("response de openai", response)
    return response.choices[0];
  } catch (error) {
    return error;
  }
};
