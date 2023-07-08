import express from "express";
import { ourChatController } from "../controllers/ourChats.js";
import { validatePaging } from "../middlewares/error/errorHandling.js";

const app = express();

app.post("/", ourChatController.save);
app.get("/", validatePaging, ourChatController.get);

export { app as ourChatRoute };
