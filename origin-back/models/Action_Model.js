const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Action_Model = sequelize.define(
  "action_model",
  {
    idUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idAction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Action_Model.sync();
module.exports = Action_Model;
