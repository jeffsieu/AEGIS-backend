/* eslint-disable no-undef */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Member, Duty }) {
      this.belongsToMany(Member, { through: "Qualification",  foreignKey: "role_id", as: "role" });
      this.hasMany(Duty, { foreignKey: "role_id", as: "roles" })
    }
  }
  Role.init({
    role_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // validate: {
      //   isIn: [["A2", "G4 CONT", "G4 COMD"]]
      // },
    },
  }, {
    sequelize,
    tableName: "roles",
    modelName: "Role",
  });
  return Role;
};