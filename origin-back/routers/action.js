const express = require("express");
const ruta = express.Router();

const { insertAction, getAction, deleteAction } = require("../controllers/action");

ruta.route("/").post(insertAction).delete(deleteAction);
ruta.route("/actionsUsers").post(getAction);

module.exports = ruta;
