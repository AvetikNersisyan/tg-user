import express from "express";
import { userController } from "../controllers/users.js";
import { validatePaging } from "../middlewares/error/errorHandling.js";

const app = express();

app.post("/", userController.save);
app.get("/", validatePaging, userController.get);
app.get("/:tgID", userController.getByTgID);

export { app as userRoute };
