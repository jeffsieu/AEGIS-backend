/* eslint-disable no-undef */
"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Schedules", {
      schedule_id: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
        validate: {
          notNull: { msg: "Schedule must have a month" },
          notEmpty: { msg: "Month must not be empty" },
        },
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable("Schedules");
  }
};