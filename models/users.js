// import { sequelize } from "../db/db.js";
// import { DataTypes } from "sequelize";
// import { sourceChat } from "./sourceChats.js";

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
