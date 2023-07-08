import lodash from "lodash";
import { ApiError } from "../../Errors/ApiError.js";
import { isID } from "../../helpers/utils.js";

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

  const paging = {};

  if (limit && isID(limit)) {
    paging.limit = limit;
  }

  if (page && isID(page)) {
    paging.page = page;
  }

  if (!isUndefined(unlimit)) {
    paging.unlimit = unlimit === "true";
  }

  req.paging = paging;

  next();
};
