import { ApiError } from "../Errors/ApiError.js";
import { ErrorCodes } from "../communicationCodes/ErrorCodes.js";
import { clearObject } from "../helpers/utils.js";
import { sourceChat } from "../models/sourceChats.js";

const save = async (req, res, next) => {
  const { data: params } = req;

  let candidate = await sourceChat.findOne({
    where: {
      tg_chat_id: params.tg_chat_id,
    },
  });

  // const chatCols = {
  //   tg_chat_id,
  //   chat_name,
  // };

  if (candidate) {
    candidate.set(params);
    await candidate.save();
  } else {
    candidate = await sourceChat.create(params);
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

export const sourceChatController = {
  save,
  get,
};
