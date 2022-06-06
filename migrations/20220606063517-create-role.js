/* eslint-disable no-undef */
"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Roles", {
      role_id: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["A2", "G4 CONT", "G4 COMD"]],
            msg: "Must be a valid role"
          }
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
    await queryInterface.dropTable('Roles');
  }
};