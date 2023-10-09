import { ListFineTuneEvents } from "../utils/fineTuneServicesChatGpt.js";

export const listFineTuneEventsController = async function (req, res) {
	try {
		const fineTuningJobId = req.query["fineTuningJobId"];
		const response = await ListFineTuneEvents(fineTuningJobId);
		res.send(response);
	} catch (error) {
		res.send(error);
	}
};
