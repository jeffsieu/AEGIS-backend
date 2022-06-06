/* eslint-disable no-undef */
"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("qualifications", {
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATEONLY
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("qualifications");
  }
};