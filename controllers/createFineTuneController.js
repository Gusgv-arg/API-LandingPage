import { CreateFineTune } from "../utils/fineTuneServicesChatGpt.js";


export const createFineTuneController = async function (req, res){
    try {
        const fileId = req.query["fileId"];
        const response = await CreateFineTune(fileId);
        console.log(response)
        res.status(200).send(response);        
    } catch (error) {
        res.status(400).send(error)
    }
}