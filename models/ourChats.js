import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const ourChats = sequelize.define(
  "our_chats",
  {
    tg_chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    chat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
