import express from "express";
import { validatePaging } from "../middlewares/error/errorHandling.js";
import { sourceChatController } from "../controllers/sourceChats.js";
import { validateSourceChatBody } from "../controllers/validators.js";

const app = express();

app.post("/", validateSourceChatBody, sourceChatController.save);
app.get("/", validatePaging, sourceChatController.get);

export { app as sourceChats };
