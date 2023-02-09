const User = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");
const { isValidEmail } = require("../utils/validate");

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { dataValues: user } = await User.findOne({ where: { email: email } });
    console.log(user);
    if (!user) {
      return res.status(400).json({ mensaje: "Correo o contraseña invalidos" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Correo o contraseña no válidos - Password" });
    }

    const { id, name } = user;

    const token = signToken(id, email);
    return res.status(200).json({ data: { token, user: { name, email } } });
  } catch (error) {
    return res.status(400).json({ mensaje: "Error inesperado" + error.mensaje });
  }
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (name.length < 0) {
      return res.status(400).json({ mensaje: "El nombre es obligatorio" });
    }
    if (email.length < 0) {
      return res.status(400).json({ mensaje: "El Email es obligatorio" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ mensaje: "El Email no parece tener el formato correcto" });
    }
    if (password.length <= 4) {
      return res.status(400).json({ mensaje: "La contraseña debe tener mas de 4 caracteres" });
    }
    const emailLowerCase = email.toLocaleLowerCase();
    const passwordHash = bcrypt.hashSync(password);
    const { dataValues } = await User.create({ name, email: emailLowerCase, password: passwordHash });
    const { id } = dataValues;
    const token = signToken(id, email);
    return res.status(200).json({ data: { token, user: { name, email } } });
  } catch (error) {
    return res.status(400).json({ mensaje: "Error inesperado" + error.mensaje });
  }
};
