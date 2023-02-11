const express = require("express");
const ruta = express.Router();

const { logIn, register, checkToken } = require("../controllers/user");

ruta.route("/login").post(logIn);
ruta.route("/register").post(register);
ruta.route("/check-token").post(checkToken);

module.exports = ruta;
