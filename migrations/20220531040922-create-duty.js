/* eslint-disable no-undef */
"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("duties", {
      duty_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Member must have a callsign" },
          notEmpty: { msg: "Callsign must not be empty" },
        },
      },
      schedule_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      role_id: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["A2", "G4 CONT", "G4 COMD"]],
            msg: "Must be a valid role"
          }
        },
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("duties");
  }
};