import { ApiError } from "../Errors/ApiError.js";
import { ErrorCodes } from "../communicationCodes/ErrorCodes.js";
import { clearObject, isID } from "../helpers/utils.js";

export const validateCountryBody = (req, res, next) => {
  const { phone_code, name, intl_code } = req.body;

  const params = {
    phone_code,
    name,
    intl_code,
  };

  const normalizedData = clearObject(params);

  if (!Object.keys(normalizedData).length) {
    return next(ApiError.BadRequest(ErrorCodes.NO_DATA_PROVIDED));
  }
  req.data = normalizedData;
  next();
};

export const validateSourceChatBody = (req, res, next) => {
  const { tg_chat_id, chat_name } = req.body;

  const params = {
    tg_chat_id,
    chat_name,
  };

  if (!tg_chat_id || !isID(tg_chat_id)) {
    return next(ApiError.BadRequest(ErrorCodes.INVALID_CHAT_ID));
  }

  const normalizedData = clearObject(params);

  if (!Object.keys(normalizedData).length) {
    return next(ApiError.BadRequest(ErrorCodes.NO_DATA_PROVIDED));
  }
  req.data = normalizedData;
  next();
};
