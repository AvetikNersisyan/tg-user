import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const USER_JOIN_STATUS = {
  joined: "1",
  left: "2",
  neutral: "3",
};


export const ourChatUsers = sequelize.define(
  "our_chat_users",
  {
    join_status: {
      type: DataTypes.ENUM(USER_JOIN_STATUS.joined, USER_JOIN_STATUS.left, USER_JOIN_STATUS.neutral),
      allowNull: false,
    },
    // joined_our_chat: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    // left_our_chat: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    create_unix: {
      type: DataTypes.BIGINT,
    },

    update_unix: {
      type: DataTypes.BIGINT,
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
    hasTrigger: true,
  }
);
