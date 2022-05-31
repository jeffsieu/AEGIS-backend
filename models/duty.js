'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Duty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Duty.init({
    callsign: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: { msg: 'Member must have a callsign' },
        notEmpty: { msg: 'Callsign must not be empty' },
      },
    },
    duty_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NIL",
    },
  }, {
    sequelize,
    tableName: 'duties',
    modelName: 'Duty',
  });
  return Duty;
};