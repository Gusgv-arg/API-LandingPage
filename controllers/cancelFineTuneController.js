import { CancelFineTune } from "../utils/fineTuneServicesChatGpt.js";

export const cancelFineTuneController = async function (req, res) {
	try {
		const fineTuneId = req.query["fineTuneId"];
		const response = await CancelFineTune(fineTuneId);
		res.status(response.status).send(response.data);
	} catch (error) {
        res.send(error)
    }
};
