const express = require("express");
const ruta = express.Router();

const { insertAction, getAction, deleteAction, getActionId } = require("../controllers/action");

ruta.route("/").post(insertAction).delete(deleteAction);
ruta.route("/actionsUsers").post(getAction);
ruta.route("/ActionsId").post(getActionId);

module.exports = ruta;
