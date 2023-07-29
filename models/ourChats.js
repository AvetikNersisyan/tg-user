import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const ourChats = sequelize.define(
  "our_chats",
  {
    tg_chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    chat_name: {
      type: DataTypes.STRING,
      defaultValue: 'Our Chat Default value',
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);


