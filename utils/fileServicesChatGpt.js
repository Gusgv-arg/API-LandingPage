import OpenAI from 'openai';
import xlsx from 'xlsx';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY_CHATGPT;

const openai = new OpenAI({
  apiKey: API_KEY,
});

//Example of data preparation
//{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?"}]}

export const TransformData = async function () {
  var workbook = xlsx.readFile('assets/fine-tune-landingChatBot.xlsx');
  var sheet_name_list = workbook.SheetNames;
  var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  for (const item of xlData) {
    //var object = `{"prompt": "${item.Question} ->", "completion": "${item.Answer} END"}`;
    var object = `{"messages": [{"role": "system", "content": "${item.System}"}, {"role": "user", "content": "${item.Question}"}, {"role": "assistant", "content": "${item.Answer}"}]}`;

    await fs.appendFileSync(
      'assets/data-set.jsonl',
      object,
      'utf8',
      function () {},
    );
    await fs.appendFileSync(
      'assets/data-set.jsonl',
      '\r\n',
      'utf8',
      function () {},
    );
  }
};

export const UploadFile = async function () {
  const response = await openai.files.create({
    file: fs.createReadStream('assets/data-set.jsonl'),
    purpose: 'fine-tune',
  });
  return response;
};

export const ListFiles = async function () {
  const response = await openai.files.list();
  return response;
};

export const RetrieveFile = async function (fileId) {
  try {
    const response = await openai.files.retrieve(fileId);
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteFile = async function (fileId) {
  try {
    const response = await openai.files.del(fileId);
    return response;
  } catch (error) {
    return error;
  }
};
