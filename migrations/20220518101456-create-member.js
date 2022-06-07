/* eslint-disable no-undef */
"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("members", {
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Member must have a callsign" },
          notEmpty: { msg: "Callsign must not be empty" },
        },
      },
      squadron: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Member must have a squadron" },
          notEmpty: { msg: "Squadron must not be empty" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "MEMBER",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("members");
  },
};