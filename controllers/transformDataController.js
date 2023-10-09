import { TransformData } from "../utils/fileServicesChatGpt.js";

export const transformDataController = async (req, res) => {
	try {
		await TransformData();
		res.status(200).send("Data transformed to Openai format requirement");
	} catch (error) {
		res.status(400).send("There has been a problem transforming data");
	}
};
