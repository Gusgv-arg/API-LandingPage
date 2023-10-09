import { DeleteFineTune } from "../utils/fineTuneServicesChatGpt.js";


export const deleteFineTuneController = async function (req,res){
    try {
        const model = req.query["model"];
        const response = await DeleteFineTune(model);
        res.send(response.data); 
    } catch (error) {
        res.send(error)
    }
}