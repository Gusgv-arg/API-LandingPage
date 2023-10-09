import { UploadFile } from "../utils/fileServicesChatGpt.js";

export const uploadDataController = async function (req, res) {
	try {
		const response = await UploadFile();
		res.send(response);
	} catch (error) {
		res.status(400).send(error.message);
	}
};
