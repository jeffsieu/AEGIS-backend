/* eslint-disable no-undef */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Duty }) {
      this.hasMany(Duty, { foreignKey: "schedule_id", as: "schedules" });
    }
  }
  Schedule.init({
    schedule_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    month: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Schedule must have a month" },
        notEmpty: { msg: "Month must not be empty" },
      },
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    tableName: "schedules",
    modelName: "Schedule",
  });
  return Schedule;
};