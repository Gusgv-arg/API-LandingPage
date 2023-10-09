import { ListFiles } from "../utils/fileServicesChatGpt.js";

export const listFilesController = async function (req, res) {
	try {
		const response = await ListFiles();
		res.status(200).send(response.data);
	} catch (error) {
		res.send(error.message);
	}
};
