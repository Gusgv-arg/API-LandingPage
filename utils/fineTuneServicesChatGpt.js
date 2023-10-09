import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY_CHATGPT;

const openai = new OpenAI({
  apiKey: API_KEY,
});

export const CreateFineTune = async function (fileId) {
  try {
    //const response = await openai.fineTunes.create({
    const response = await openai.fineTuning.jobs.create({
      training_file: fileId,
      model: 'gpt-3.5-turbo', //"davinci",
      suffix: 'Mi modelo ultimo',
    });
    console.log('response desde CreateFineTune', response);
    return response;
  } catch (e) {
    console.log('errorrrrrrrrrrrrr', e);
    return { status: 400, data: e };
  }
};

export const ListFineTune = async function () {
  try {
    const response = await openai.fineTuning.jobs.list();
    return response;
  } catch (e) {
    return { status: 400, data: e };
  }
};

export const RetrieveFineTune = async function (fineTuneId) {
  try {
    const response = await openai.fineTuning.jobs.retrieve(fineTuneId);
    return response;
  } catch (e) {
    return { status: 400, data: e };
  }
};

export const CancelFineTune = async function (fineTuneId) {
  try {
    const response = await openai.fineTuning.jobs.cancel(fineTuneId);
    return response;
  } catch (e) {
    return { status: 400, data: e };
  }
};

export const DeleteFineTune = async function (model) {
  try {
    const response = await openai.models.del(model);
    return response;
  } catch (e) {
    return { status: 400, data: e };
  }
};

export const ListFineTuneEvents = async function (fineTuningJobId) {
  try {
    const response = await openai.fineTuning.jobs.listEvents(fineTuningJobId);
    return response;
  } catch (e) {
    return { status: 400, data: e };
  }
};
