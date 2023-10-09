import { ListFineTune } from "../utils/fineTuneServicesChatGpt.js";

export const listFineTuneController = async function (req, res) {
	try {
		const response = await ListFineTune();
		console.log("finetunes", response)
		res.send(response.body.data);
	} catch (error) {
		res.status(400).send(error);
	}
};
