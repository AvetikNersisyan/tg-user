import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
// import { users } from "./users.js";

export const sourceChat = sequelize.define("source_chats", {
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

export const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  tg_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },

  first_name: {
    type: DataTypes.TEXT,
  },
  last_name: {
    type: DataTypes.TEXT,
  },

  username: {
    type: DataTypes.TEXT,
  },
});

console.log(users, "users");
users.belongsToMany(sourceChat, { through: "user_chats" });
sourceChat.belongsToMany(users, { through: "user_chats" });
