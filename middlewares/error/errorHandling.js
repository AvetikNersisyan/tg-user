import { ApiError } from "../../Errors/ApiError.js";

export const errorHandling = (err, req, res, next) => {
  return res.status(err.status || 400).json({ message: err.message });
};

export const validateBody = (req, res, next) => {
  console.log("body", req.body);
  if (!req.body) {
    return next(ApiError.BadRequest({ message: "Send body", data: req.body }));
  }

  next();
};
