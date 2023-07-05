import express from "express";
import { userRoute } from "./users.js";
import { validateBody } from "../middlewares/error/errorHandling.js";

const app = express();

app.use(validateBody);

app.use("/users", userRoute);

export { app as mainRoute };
