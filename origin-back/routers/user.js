const express = require("express");
const ruta = express.Router();

const { logIn, register } = require("../controllers/user");

ruta.route("/login").post(logIn);
ruta.route("/register").post(register);

module.exports = ruta;
