import express from "express";
import { askChatGptController } from "../controllers/askChatGptController.js";
import { transformDataController } from "../controllers/transformDataController.js";
import { uploadDataController } from "../controllers/uploadDataController.js";
import { listFilesController } from "../controllers/listFilesController.js";
import { retrieveFilesController } from "../controllers/retieveFilesController.js";
import { deleteFileController } from "../controllers/deleteFileController.js";
import { createFineTuneController } from "../controllers/createFineTuneController.js";
import { listFineTuneController } from "../controllers/listFineTuneController.js";
import { retrieveFineTuneController } from "../controllers/retrieveFineTuneController.js";
import { cancelFineTuneController } from "../controllers/cancelFineTuneController.js";
import { deleteFineTuneController } from "../controllers/deleteFineTuneController.js";
import { askMyChatGptController } from "../controllers/askMyChatGptController.js";
import { listFineTuneEventsController } from "../controllers/listFineTuneEventsController.js";
import { createEmbeddingController } from "../controllers/createEmbeddingController.js";
import { leadsController } from "../controllers/leadsController.js";

const chatGptRouter = express.Router();

chatGptRouter.post("/askChatGpt", askChatGptController);
//chatGptRouter.get("/askMyChatGpt", askMyChatGptController);
chatGptRouter.post("/askMyChatGpt", askMyChatGptController);
chatGptRouter.post("/transformData", transformDataController);
chatGptRouter.post("/uploadData", uploadDataController);
chatGptRouter.get("/listUploadedFiles", listFilesController);
chatGptRouter.get("/retieveFile", retrieveFilesController);
chatGptRouter.delete("/deleteFile", deleteFileController);
chatGptRouter.post("/createFineTune", createFineTuneController);
chatGptRouter.get("/listFineTune", listFineTuneController);
chatGptRouter.get("/retrieveFineTune", retrieveFineTuneController);
chatGptRouter.post("/cancelFineTune", cancelFineTuneController);
chatGptRouter.delete("/deleteFineTune", deleteFineTuneController);
chatGptRouter.get("/listFineTuneEvents", listFineTuneEventsController);
chatGptRouter.post("/createEmbedding", createEmbeddingController);
chatGptRouter.post("/leads", leadsController);

export default chatGptRouter;
