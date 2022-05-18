'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      userID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a callsign' },
          notEmpty: { msg: 'Callsign must not be empty' },
        },
      },
      squadron: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a squadron' },
          notEmpty: { msg: 'Squadron must not be empty' },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "MEMBER",
        validate: {
          notNull: { msg: 'User must have a role' },
          notEmpty: { msg: 'Role must not be empty' },
        },
      },
      duty_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: { msg: 'User must have a duty count' },
          notEmpty: { msg: 'Duty count must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )
  return User
}