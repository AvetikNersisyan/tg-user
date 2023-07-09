import express from "express";
import { countryController } from "../controllers/countries.js";
import { validateCountryBody } from "../controllers/validators.js";
import { validatePaging } from "../middlewares/error/errorHandling.js";

const app = express();

app.post("/", validateCountryBody, countryController.save);
app.get("/", validatePaging, countryController.getAll);
app.get("/:countryID", countryController.getByID);
app.put("/:countryID", validateCountryBody, countryController.updateOne);

export { app as countryRoute };
