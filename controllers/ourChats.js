import { ApiError } from "../Errors/ApiError.js";
import { ErrorCodes } from "../communicationCodes/ErrorCodes.js";
import { clearObject } from "../helpers/utils.js";
import { ourChats } from "../models/ourChats.js";

const save = async (req, res, next) => {
  const { tg_chat_id, chat_name } = req.body;

  if (!(chat_name && tg_chat_id)) {
    return next(ApiError.BadRequest(ErrorCodes.NAME_ID_REQ));
  }

  let candidate = await ourChats.findOne({
    where: {
      tg_chat_id,
    },
  });

  const chatCols = {
    tg_chat_id,
    chat_name,
  };

  if (candidate) {
    await candidate.update({
      chat_name,
    });
  } else {
    candidate = await ourChats.create({
      ...clearObject(chatCols),
    });
  }

  return res.send({ success: true, data: candidate });
};

const get = async (req, res, next) => {
  const { paging } = req;
  const params = paging.unlimit ? {} : paging;
  try {
    const data = await ourChats.findAndCountAll(params);

    return res.send({ success: true, data });
  } catch (e) {
    return next(ApiError.ServerError(e));
  }
};

export const ourChatController = {
  save,
  get,
};
