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
    static associate({ Member }) {
      this.belongsTo(Member, { foreignKey: 'duty_id', as: 'member' })
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
      allowNull: false,
      validate: {
        notNull: { msg: 'Member must have a callsign' },
        notEmpty: { msg: 'Callsign must not be empty' },
      },
    },
    schedule_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    duty_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NIL",
    },
    date: {
      type: DataTypes.DATEONLY,
    }
  }, {
    sequelize,
    tableName: 'duties',
    modelName: 'Duty',
  });
  return Duty;
};