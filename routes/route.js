import express from "express";
import { userRoute } from "./users.js";
import { validateBody } from "../middlewares/error/errorHandling.js";
import { sourceChats } from "./sourceChats.js";
import { countryRoute } from "./countries.js";
import { ourChatRoute } from "./ourChats.js";

const app = express();

app.use(validateBody);

app.use("/users", userRoute);
app.use("/our_chats", ourChatRoute);
app.use("/source_chats", sourceChats);
app.use("/countries", countryRoute);

export { app as mainRoute };
