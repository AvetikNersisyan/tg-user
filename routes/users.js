import express from "express";
import { userController } from "../controllers/users.js";
import {
  validateJoinStatus,
  validatePaging
} from '../middlewares/error/errorHandling.js';

const app = express();

app.post("/", userController.save);
// app.post("/:tgID", userController.saveByTgID);
app.post("/bulk_save", userController.bulkSave);
app.get("/", validatePaging, validateJoinStatus, userController.get);
app.get("/:tgID", userController.getByTgID);

export { app as userRoute };
