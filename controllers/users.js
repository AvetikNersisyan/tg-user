import lodash from 'lodash';
import { ApiError } from "../Errors/ApiError.js";
import { ErrorCodes } from "../communicationCodes/ErrorCodes.js";
import { clearObject, isID } from "../helpers/utils.js";
import { USER_JOIN_STATUS } from '../models/constants.js';
import { ourChats } from "../models/ourChats.js";
import { sourceChat } from "../models/sourceChats.js";
import { users } from "../models/users.js";
import { normalizeChatReq, normalizeOnlineDate } from "./utills.js";
import { ourChatUsers } from "../models/ourChatUsers.js";

const { isUndefined }  = lodash;
const save = async (req, res, next) => {
  const {
    tg_id,
    username,
    last_name,
    first_name,
    source_chat_id,
    bot_inline_geo,
    access_hash,
    phone,
    lang_code,
    country,
    is_bot,
    user_online_date,
    our_chat_tg_id,
    join_status = USER_JOIN_STATUS.neutral,
    our_chat_id,
    // joined_our_chat,
    // left_our_chat,
  } = req.body;

  if (!tg_id && !isID(tg_id)) {
    return next(ApiError.BadRequest(ErrorCodes.TG_ID_REQ));
  }

  if(!isUndefined(join_status) && !USER_JOIN_STATUS[join_status]) {
    return  next(ApiError.BadRequest(ErrorCodes.INVALID_JOIN_STATUS))
  }

  try {
    let chat;
    if (source_chat_id) {
      [chat] = await sourceChat.findOrCreate({
        where: { tg_chat_id: source_chat_id },
        defaults: { tg_chat_id: source_chat_id },
      });
      if (!chat) {
        return next(ApiError.BadRequest(ErrorCodes.INVALID_CHAT_ID));
      }
    }

    const onlineDate = normalizeOnlineDate(user_online_date);

    // return res.send({ onlineDate });

    const userParams = {
      tg_id,
      username,
      last_name,
      first_name,
      bot_inline_geo,
      access_hash,
      phone,
      lang_code,
      countryId: country,
      is_bot,
      user_online_date: onlineDate,
    };

    let candidate = await users.findOne({
      where: { tg_id },
      include: [
        {
          model: ourChats,
          through: { attributes: ["join_status"], as: "member" },
        },
      ],
    });

    if (candidate) {
      await candidate.update({
        ...clearObject(userParams),
      });
    } else {
      candidate = await users.create({
        ...clearObject(userParams),
      });
    }

    await candidate.addSource_chat(chat);
    const normalizedChatReq = normalizeChatReq(our_chat_tg_id, our_chat_id);

    let ourChat = normalizedChatReq && await ourChats.findOne({
      where: normalizedChatReq,
    });

    if (!ourChat && normalizedChatReq) {
      ourChat = await ourChats.create(normalizedChatReq)
    }


    if (ourChat) {
      await candidate.addOur_chats(ourChat, {
        through: { join_status },
      });
    } else if (normalizedChatReq)  {
      // return  next(ApiError.BadRequest(ErrorCodes.INVALID_OUR_CHAT_ID))
    }

    return res.send({ success: true, data: candidate });
  } catch (e) {
    return next(ApiError.BadRequest([e.errors, e.message]));
  }
};

const getByTgID = async (req, res, next) => {
  const { tgID } = req.params;

  try {
    const candidate = await users.findOne({
      where: {
        tg_id: tgID,
      },
      include: [
        {
          model: sourceChat,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: { attributes: [] },
        },
        {
          model: ourChats,
          through: { attributes: ["join_status"] },
        },
      ],
    });

    if (candidate) {
      return res.send({ success: true, data: candidate });
    } else {
      return next(ApiError.BadRequest(ErrorCodes.INVALID_TG_ID));
    }
  } catch (e) {
    return next(ApiError.BadRequest(e));
  }
};

const get = async (req, res, next) => {
  const { paging, status } = req;

  const params = paging.unlimit ? {} : paging;
  try {
    const data = await users.findAndCountAll({
      ...params,
      distinct: "users.id",
      where: {
       ...status,
      },
      include: [
        {
          model: sourceChat,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: { attributes: [] },
        },
        {
          model: ourChats,
          through: {
            model: ourChatUsers,
            },
        },
      ],
    });

    return res.send({ success: true, data });
  } catch (e) {
    return next(ApiError.BadRequest(e.message));
  }
};

const bulkSave = async (req, res, next) => {
  const { bulk } = req.body;

  if (!Array.isArray(bulk)) {
    return next(ApiError.BadRequest(ErrorCodes.BULK_IS_NOT_ARRAY));
  }

  console.log(bulk, "bulk");
  for (let i = 0; i < bulk.length; i++) {
    const user = bulk[i];

    console.log(user, "user");
    const {
      tg_id,
      username,
      last_name,
      first_name,
      source_chat_id,
      bot_inline_geo,
      access_hash,
      phone,
      lang_code,
      country,
      is_bot,
      user_online_date,
      our_chat_tg_id,
      join_status,
      our_chat_id,
    } = user;

    if (!tg_id && !isID(tg_id)) {
      return next(ApiError.BadRequest(ErrorCodes.TG_ID_REQ));
    }

    try {
      let chat;
      if (source_chat_id) {
        [chat] = await sourceChat.findOrCreate({
          where: { tg_chat_id: source_chat_id },
          defaults: { tg_chat_id: source_chat_id },
        });

        if (!chat) {
          return next(ApiError.BadRequest(ErrorCodes.INVALID_CHAT_ID));
        }
      }

      const onlineDate = normalizeOnlineDate(user_online_date);

      // return res.send({ onlineDate });

      const userParams = {
        tg_id,
        username,
        last_name,
        first_name,
        bot_inline_geo,
        access_hash,
        phone,
        lang_code,
        countryId: country,
        is_bot,
        user_online_date: onlineDate,
      };

      let candidate = await users.findOne({
        where: { tg_id },
        include: [
          {
            model: ourChats,
            through: { attributes: ["join_status"], as: "member" },
          },
        ],
      });

      if (candidate) {
        await candidate.update({
          ...clearObject(userParams),
        });
      } else {
        candidate = await users.create({
          ...clearObject(userParams),
        });
      }

      await candidate.addSource_chat(chat);
      const ourChat = await ourChats.findOne({
        where: normalizeChatReq(our_chat_tg_id, our_chat_id),
      });

      if (ourChat) {
        await candidate.addOur_chats(ourChat, {
          through: { join_status },
        });
      }

      // return res.send({ success: true, data: candidate });
    } catch (e) {
      return next(ApiError.BadRequest([e.errors, e.message]));
    }
  }

  return res.send({ success: true });
};


const updateUser = async (req, res, next) => {
  // const { tg_id, }

  return res.send({success: true})
}
export const userController = {
  save,
  bulkSave,
  getByTgID,
  get,
  updateUser,
};

// const a = {
//   bulk: [
//     {
//       tg_id: 1482457120,
//       source_chat_id: 1409551458,
//       first_name: "Angel🦋",
//       username: "nsswq",
//       bot_inline_geo: False,
//       access_hash: 9076929737233669579,
//       is_bot: False,
//       user_online_date: "UserStatusRecently()",
//     },
//     {
//       tg_id: 6023488891,
//       source_chat_id: 1409551458,
//       first_name: "Anna",
//       username: "annbnny",
//       bot_inline_geo: False,
//       access_hash: -4391907673517207241,
//       is_bot: False,
//       user_online_date: "UserStatusRecently()",
//     },
//   ],
// };
