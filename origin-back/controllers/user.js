const { LogIn, Register, CheckToken } = require("../services/userService");

exports.logIn = async (req, res) => await LogIn(res, req.body);

exports.register = async (req, res) => await Register(res, req.body);

exports.checkToken = async (req, res) => await CheckToken(res, req.body);
