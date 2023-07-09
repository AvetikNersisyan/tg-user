import express from "express";
import bodyParser from "body-parser";
import { errorHandling } from "./middlewares/error/errorHandling.js";
import { models } from "./models/models.js";
import { sequelize } from "./db/db.js";
import { mainRoute } from "./routes/route.js";

import { sourceChat } from "./models/sourceChats.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.use(mainRoute);

app.use(errorHandling);

app.get("/", (req, res, next) => {
  res.send({ success: true, data: "Received!" });
});

const synchronize = async () => {
  await sequelize.authenticate({});
  await sequelize.sync({ alter: true });

  // await sourceChat.sync({ force: true });
};

app.listen(port, () => {
  synchronize();
  console.log(`listening on port: ${port}`);
});
