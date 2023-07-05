import { ApiError } from "../Errors/ApiError.js";
import { ErrorCodes } from "../communicationCodes/ErrorCodes.js";
import { clearObject } from "../helpers/utils.js";
import { sourceChat, users } from "../models/sourceChats.js";

const save = async (req, res, next) => {
  const { tg_id, username, last_name, first_name, source_chat_id } = req.body;

  if (!tg_id) {
    return next(ApiError.BadRequest(ErrorCodes.TG_ID_REQ));
  }

  try {
    let chat;
    if (source_chat_id) {
      [chat] = await sourceChat.findOrCreate({
        where: { chat_id: source_chat_id },
      });

      if (!chat) {
        return next(ApiError.BadRequest(ErrorCodes.INVALID_CHAT_ID));
      }
    }

    const userParams = {
      tg_id,
      username,
      last_name,
      first_name,
    };
    const options = {
      include: [sourceChat],
    };

    // if (source_chat_id) {
    //   userParams.source_chats = chat;
    // }

    const candidate = await users.findOne({
      where: { tg_id },
    });

    if (candidate) {
      await candidate.update({
        ...clearObject(userParams),
      });
    } else {
      await candidate.create({
        ...clearObject(userParams),
      });
    }

    await candidate.addSource_chat(chat);

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
      include: {
        model: sourceChat,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        through: { attributes: [] },
      },
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

export const userController = {
  save,
  getByTgID,
};
