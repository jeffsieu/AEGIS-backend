'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users')
  },
}