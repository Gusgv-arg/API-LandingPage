import { DeleteFile } from "../utils/fileServicesChatGpt.js";


export const deleteFileController = async function (req, res) {
	try {
		const fileId = req.query["fileId"];
		const response = await DeleteFile(fileId);
		res.send(response)
	} catch (error) {
		res.status(400).send(error.message)
	}
};
