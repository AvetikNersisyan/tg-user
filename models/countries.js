import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const countries = sequelize.define(
  "countries",
  {
    intl_code: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone_code: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    timestamps: false,
  }
);

// countries.hasMany(users);
// users.belongsTo(countries);

export { countries };
