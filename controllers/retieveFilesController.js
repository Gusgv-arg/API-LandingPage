import { RetrieveFile } from "../utils/fileServicesChatGpt.js";

export const retrieveFilesController = async function (req, res) {
	try {
		const fileId = req.query["fileId"];
		const response = await RetrieveFile(fileId);
		res.send(response)
		
	} catch (error) {
		return error.message;
	}
};
