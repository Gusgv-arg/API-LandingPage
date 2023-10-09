import { RetrieveFineTune } from "../utils/fineTuneServicesChatGpt.js";


export const retrieveFineTuneController = async function (req, res) {
	try {
		const fineTuneId = req.query["fineTuneId"];
		const response = await RetrieveFineTune(fineTuneId);
		res.send(response);
	} catch (error) {
        res.send(error)
    }
};
