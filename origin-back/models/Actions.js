const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Action = sequelize.define(
  "actions",
  {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mic_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Action.sync();
module.exports = Action;
