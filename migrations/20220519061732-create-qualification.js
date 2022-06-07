/* eslint-disable no-undef */
"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("qualifications", {
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Member must have a callsign" },
          notEmpty: { msg: "Callsign must not be empty" },
        },
      },
      role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: {
          args: [["A2", "G4 CONT", "G4 COMD"]],
          msg: "Must be a valid role"
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("qualifications");
  }
};