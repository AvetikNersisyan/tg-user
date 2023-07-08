export const normalizeChatReq = (chatTgID, chatID) => {
  const ourChatFilter = {};

  if (chatTgID) {
    ourChatFilter.tg_chat_id = chatTgID;
  }

  if (chatID) {
    ourChatFilter.id = chatID;
  }

  return ourChatFilter;
};
