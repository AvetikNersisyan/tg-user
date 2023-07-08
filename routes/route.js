import express from "express";
import { userRoute } from "./users.js";
import { validateBody } from "../middlewares/error/errorHandling.js";
import { ourChatRoute } from "./ourChats.js";

const app = express();

app.use(validateBody);

app.use("/users", userRoute);
app.use("/our_chats", ourChatRoute);

export { app as mainRoute };
