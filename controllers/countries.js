import { ApiError } from "../Errors/ApiError.js";
import { ErrorCodes } from "../communicationCodes/ErrorCodes.js";
import { clearObject, isID } from "../helpers/utils.js";
import { countries } from "../models/countries.js";

const save = async (req, res, next) => {
  const { data: params } = req;

  try {
    const candidate = await countries.create(clearObject(params));
    return res.send({ success: true, data: candidate });
  } catch (e) {
    return next(ApiError.BadRequest(e));
  }
};

const getAll = async (req, res, next) => {
  const { paging } = req;

  const params = paging.unlimit ? {} : paging;

  try {
    const data = await countries.findAll(params);
    return res.send({ success: true, data });
  } catch (e) {
    return next(ApiError.BadRequest(e));
  }
};

const getByID = async (req, res, next) => {
  const { countryID } = req.params;

  if (!isID(countryID)) {
    return next(ApiError.BadRequest(ErrorCodes.INVALID_COUNTRY_ID));
  }

  try {
    const candidate = await countries.findByPk(countryID);
    if (!candidate) {
      return next(ApiError.BadRequest(ErrorCodes.INVALID_COUNTRY_ID));
    }
    return res.send({ success: true, data: candidate });
  } catch (e) {
    return next(ApiError.BadRequest(e));
  }
};

const updateOne = async (req, res, next) => {
  const { countryID } = req.params;
  const { data: params } = req;

  if (!isID(countryID)) {
    return next(ApiError.BadRequest(ErrorCodes.INVALID_COUNTRY_ID));
  }

  console.log("paramssssssssssssssssssssss", params);
  try {
    const candidate = await countries.findByPk(countryID);

    if (!candidate) {
      return next(ApiError.BadRequest(ErrorCodes.INVALID_COUNTRY_ID));
    }
    candidate.set(clearObject(params));

    await candidate.save();

    return res.send({ success: true, data: candidate });
  } catch (e) {
    return next(ApiError.BadRequest(e));
  }
};

export const countryController = {
  save,
  getAll,
  getByID,
  updateOne,
};
