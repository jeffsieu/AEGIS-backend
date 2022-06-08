/* eslint-disable no-undef */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Duty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Member, Schedule, Role }) {
      this.belongsToMany(Member, { through: "Qualification", foreignKey: "callsign", as: "members" });
      this.belongsTo(Schedule, { foreignKey: "schedule_id", as: "schedule" });
      this.belongsTo(Role, { foreignKey: "role_id", as: "role" });
    }
  }
  Duty.init({
    duty_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    callsign: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notNull: { msg: "Member must have a callsign" },
      //   notEmpty: { msg: "Callsign must not be empty" },
      // },
    },
    schedule_id: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "Schedule must have a month" },
        notEmpty: { msg: "Month must not be empty" },
      },
    },
    role_id: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["A2", "G4 CONT", "G4 COMD"]],
          msg: "Must be a valid role"
        }
      },
    },
    date: {
      type: DataTypes.DATEONLY,
    }
  }, {
    sequelize,
    tableName: "duties",
    modelName: "Duty",
  });
  return Duty;
};