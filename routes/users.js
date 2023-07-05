import express from "express";
import { userController } from "../controllers/users.js";

const app = express();

app.post("/", userController.save);
app.get("/:tgID", userController.getByTgID);

export { app as userRoute };
