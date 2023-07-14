import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { sourceChat } from "./sourceChats.js";

// lang_code,
// country,
// is_bot,
// user_online_date,
// our_group_joined,
// our_group_left,
export const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    tg_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },

    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },

    username: {
      type: DataTypes.STRING,
    },

    access_hash: {
      type: DataTypes.TEXT,
    },

    phone: {
      type: DataTypes.STRING,
    },

    bot_inline_geo: {
      type: DataTypes.BOOLEAN,
    },
    is_bot: {
      type: DataTypes.BOOLEAN,
    },
    user_online_date: {
      type: DataTypes.BIGINT,
    },
    createdAt: {
      type: DataTypes.INTEGER,
    },
    update_unix: {
      type: DataTypes.INTEGER,
    },
    create_unix: {
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeCreate: (record, options) => {
        const create_unix = Math.floor(Date.now() / 1000);
        record.setDataValue("create_unix", create_unix);
      },
      beforeUpdate: (record, options) => {
        const update_unix = Math.floor(Date.now() / 1000);
        record.setDataValue("update_unix", update_unix);
      },
    },
    timestamps: false,
  }
);

// users.belongsToMany(sourceChat, { through: "user_chats" });
// sourceChat.belongsToMany(users, { through: "user_chats" });
