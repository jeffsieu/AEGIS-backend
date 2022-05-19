'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('qualifications', {
      callsign: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
          notNull: { msg: 'User must have a callsign' },
          notEmpty: { msg: 'Callsign must not be empty' },
        },
      },
      a2_day: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      a2_day_stby: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      a2_night: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      a2_night_stby: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      a2_trainee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      g4_comd: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      g4_comd_stby: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      g4_comd_trainee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      g4_cont: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      g4_cont_stby: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      g4_cont_trainee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('qualifications');
  }
};