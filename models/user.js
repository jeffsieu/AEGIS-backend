'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate({ Qualification }) {
      this.hasMany(Qualification, { foreignKey: 'callsign', as: 'qualifications' })
    }
  }
  User.init(
    {
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
        defaultValue: "MEMBER"
      },
      duty_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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