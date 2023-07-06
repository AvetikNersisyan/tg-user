import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

console.log(port, '-------port ------- 22222222-----------');
console.log(dbUsername, '-------dbUsername ------- 22222222-----------');
console.log(dbPass, '-------dbPass ------- 22222222-----------');
console.log(host, '-------host ------- 22222222-----------');
console.log(dbName, '-------dbName ------- 22222222-----------');

export const sequelize = new Sequelize(dbName, dbUsername, dbPass, {
  dialect: "postgres",
  port: port,
  host: host,
});
