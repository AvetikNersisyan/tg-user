import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { countries } from "./countries.js";
// import { users } from "./users.js";

export const sourceChat = sequelize.define("source_chats", {
  tg_chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  chat_name: {
    type: DataTypes.STRING,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

// export const users = sequelize.define("users", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },

//   tg_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     unique: true,
//   },

//   first_name: {
//     type: DataTypes.TEXT,
//   },
//   last_name: {
//     type: DataTypes.TEXT,
//   },

//   username: {
//     type: DataTypes.TEXT,
//   },
// });

// users.belongsToMany(sourceChat, { through: "user_chats" });
// sourceChat.belongsToMany(users, { through: "user_chats" });

// users.belongsTo(countries);
// countries.hasMany(users);
