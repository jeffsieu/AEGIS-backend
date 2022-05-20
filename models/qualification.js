'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'callsign', as: 'user' })
    }
  }
  Qualification.init({
    callsign: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notNull: { msg: 'User must have a callsign' },
        notEmpty: { msg: 'Callsign must not be empty' },
      },
    },
    a2_day: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    a2_day_stby: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    a2_night: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    a2_night_stby: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    a2_trainee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    g4_comd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    g4_comd_stby: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    g4_comd_trainee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    g4_cont: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    g4_cont_stby: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    g4_cont_trainee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'qualifications',
    modelName: 'Qualification',
  });
  return Qualification;
};