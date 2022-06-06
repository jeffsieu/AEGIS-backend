/* eslint-disable no-undef */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role }) {
      this.hasOne(Role, { foreignKey: "role_id", as: "role" })
    }
  }
  Qualification.init({
    callsign: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notNull: { msg: "Member must have a callsign" },
        notEmpty: { msg: "Callsign must not be empty" },
      },
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["A2", "G4 CONT", "G4 COMD"]]
      },
    },
  },
  {
    sequelize,
    tableName: "qualifications",
    modelName: "Qualification",
  });
  return Qualification;
};