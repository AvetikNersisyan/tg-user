import moment from "moment";

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

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const onlineDates = {
  recently: "UserStatusRecently",
  offline: "UserStatusOffline",
  lastMonth: "UserStatusLastMonth",
  online: "UserStatusOnline",
  lastWeek: "UserStatusLastWeek",
  empty: "UserStatusEmpty",
};

export const normalizeOnlineDate = (userOnlineDate = "") => {
  const date = new Date(userOnlineDate);

  const isValid = isValidDate(date);

  if (moment(date).isValid()) {
    return moment(date).unix();
  }

  if (isValid) {
    return moment(date).unix();
  }

  const values = Object.values(onlineDates);

  const contains = values.some((item) => userOnlineDate.startsWith(item));

  if (!contains) {
    return "";
  }
  if (
    typeof userOnlineDate !== "string" ||
    userOnlineDate.indexOf("(") === -1
  ) {
    return "";
  }

  const [first] = userOnlineDate.split("(");

  switch (first) {
    case onlineDates.empty: {
      return null;
    }
    case onlineDates.lastWeek: {
      const date = new Date();
      const lastWeek = moment(date).subtract(1, "week");
      return lastWeek.unix();
    }
    case onlineDates.lastMonth: {
      const date = new Date();
      const lastWeek = moment(date).subtract(1, "month");
      return lastWeek.unix();
    }
    case onlineDates.online: {
      const date = new Date();
      return moment(date).unix();
    }
    case onlineDates.offline: {
      const [first, dateVal] = userOnlineDate.split("datetime.datetime(");

      const [date] = dateVal.split(" tzinfo");
      const realDate = new Date(...date.split(","));

      return moment(realDate).subtract(1, "month").unix();
    }
    case onlineDates.recently: {
      const date = new Date();
      return moment(date).unix();
    }

    default: {
      return "";
    }
  }
};
