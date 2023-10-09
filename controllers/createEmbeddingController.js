import KnowledgeBase from "../models/knowledgeBaseModel.js"
import { embeddingServicesChatGpt } from "../utils/embeddingServicesChatGpt.js"

export const createEmbeddingController = async function (req, res){
    try {
        await KnowledgeBase.deleteMany({});
        const knowledgeBases = req.body.knowledgeBases; // assuming the array is sent with key 'knowledgeBases'
        const responses = [];

        for (let kb of knowledgeBases) {
            const response = await embeddingServicesChatGpt(kb.knowledgeBase);
            const knowledgeBaseInDb = new KnowledgeBase({knowledgeBase : kb.knowledgeBase, embedding: response.data[0].embedding});
            await knowledgeBaseInDb.save();
            responses.push(knowledgeBaseInDb);
        }
       res.send(responses);
    } catch (error) {
        res.send(error);
    }
}