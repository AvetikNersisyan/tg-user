import jwt from "jsonwebtoken";
import { ApiError } from "../../Errors/ApiError.js";
import { ErrorMessages } from "../../communicationCodes/errorMessages.js";

const jwtSecret = process.env.JWT_SECRET || "secret";
export const authMiddleware = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.send(ApiError.BadRequest(ErrorMessages.tokenRequired));
  }

  const [bear, token] = bearer.split(" ");

  try {
    const valid = jwt.verify(token, jwtSecret);
    req.user = valid.user;
    if (!valid) {
      // return res.send(ApiError.BadRequest(ErrorMessages.tokenInvalid));
    }
  } catch (e) {
    return res.send(ApiError.BadRequest(ErrorMessages.tokenInvalid));
  }

  // return res.status(200).send({ req: token });

  next();
};
