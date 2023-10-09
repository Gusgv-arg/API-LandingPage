import Message from '../models/messageModel.js';
import processMessageToChatGPT from '../utils/processMessageToChatGpt.js';

export const askChatGptController = async (req, res) => {
  const { messages } = req.body;
  const newMessage = new Message({
    title: messages[messages.length - 1].title,
    role: messages[messages.length - 1].role,
    content: messages[messages.length - 1].content,
  });
  await newMessage.save();

  const newArray = [];

  messages.forEach((originalObj) => {
    const newObj = {
      role: originalObj.role,
      content: originalObj.content,
    };
    newArray.push(newObj);
  });

  const response = await processMessageToChatGPT(newArray);

  const newResponse = new Message({
    title: messages[messages.length - 1].title,
    role: 'assistant',
    content: response.choices[0].message.content,
  });
  await newResponse.save();

  res.send({ role: 'assistant', content: response.choices[0].message.content });
};
