import express from "express";
import bodyParser from "body-parser";
import { errorHandling } from "./middlewares/error/errorHandling.js";
// import { users } from "./models/users.js";
import { sourceChat, users } from "./models/sourceChats.js";
import { sequelize } from "./db/db.js";
import { mainRoute } from "./routes/route.js";

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.use(mainRoute);

app.use(errorHandling);

app.get("/", (req, res, next) => {
  res.send({ data: "action" });
});

const synchronize = async () => {
  await sequelize.authenticate({});
  await sequelize.sync();
};

app.listen(port, () => {
  synchronize();
  console.log(`listening on port: ${port}`);
});
