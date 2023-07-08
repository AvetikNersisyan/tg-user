import { countries } from "./countries.js";
import { users } from "./users.js";
import { sourceChat } from "./sourceChats.js";
import { ourChats } from "./ourChats.js";
import { ourChatUsers } from "./ourChatUsers.js";

users.belongsToMany(sourceChat, { through: "user_chats" });
sourceChat.belongsToMany(users, { through: "user_chats" });

users.belongsTo(countries);
countries.hasMany(users);

ourChats.belongsToMany(users, { through: ourChatUsers });
users.belongsToMany(ourChats, { through: ourChatUsers });

export const models = {
  countries,
  users,
  sourceChat,
  ourChats,
  ourChatUsers,
};

export default models;
