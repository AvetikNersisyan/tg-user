import lodash from "lodash";
import { ApiError } from "../../Errors/ApiError.js";
import { isID } from "../../helpers/utils.js";
import { USER_JOIN_STATUS } from '../../models/constants.js';

const { isUndefined } = lodash;

export const errorHandling = (err, req, res, next) => {
  return res.status(err.status || 400).json({ message: err.message });
};

export const validateBody = (req, res, next) => {
  if (!req.body) {
    return next(ApiError.BadRequest({ message: "Send body", data: req.body }));
  }

  next();
};

export const validatePaging = (req, res, next) => {
  const { limit, page, unlimit } = req.query;

  const paging = {
    order:[ ['id', 'ASC']]
  };

  if (limit && isID(limit) && page && isID(page)) {
    paging.limit = Number(limit);
    paging.offset = Number(page * limit);
  }

  if (!isUndefined(unlimit)) {
    paging.unlimit = unlimit === "true";
  }

  req.paging = paging;

  next();
};

export const validateJoinStatus = (req, res, next) => {
  const { join_status } = req.query;
  console.log('join_status : ', join_status);
  const status = {

  };

  if (join_status && USER_JOIN_STATUS[join_status]) {
   status['$our_chats.our_chat_users.join_status$'] = join_status;
  }

  req.status = status;

  next();
};
