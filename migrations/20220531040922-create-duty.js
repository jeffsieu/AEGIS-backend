'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('duties', {
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Member must have a callsign' },
          notEmpty: { msg: 'Callsign must not be empty' },
        },
      },
      duty_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NIL",
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('duties');
  }
};