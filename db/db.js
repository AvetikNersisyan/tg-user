import { Sequelize } from "sequelize";

const dbName = "tg_users";
const dbUsername = "postgres";
const dbPass = "Asala63158400";
const host = "localhost";

export const sequelize = new Sequelize(dbName, dbUsername, dbPass, {
  dialect: "postgres",
  port: "5432",
  host: host,
});
