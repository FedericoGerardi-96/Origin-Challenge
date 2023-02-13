const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const User = require("../models/Usuario");
const { apiResponse } = require("../utils/ApiResponse");
const { signToken, isValidToken } = require("../utils/jwt");
const {isValidEmail} = require("../utils/validate")

const LogIn = async (res, userParam) => {
  console.log("llegue login")
  const { email, password } = userParam;
  try {

    if (email.length < 0) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, { mensaje: "El Email es obligatorio", ok: false });
    }

    if (password.length <= 4) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "La contraseña debe tener mas de 4 caracteres",
        ok: false,
      });
    }

    if (!isValidEmail(email)) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "El Email no parece tener el formato correcto",
        ok: false,
      });
    }

    const dbResponse = await User.findOne({ where: { email: email } });

    if (!dbResponse) {
      return apiResponse(res, StatusCodes.NOT_FOUND, { mensaje: "No se encontro el usuario ", ok: false });
    }

    const { dataValues: user } = dbResponse;

    if (!bcrypt.compareSync(password, user.password)) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, { mensaje: "Contraseña no válida", ok: false });
    }

    const { id, name } = user;

    const token = signToken(id, email);
    return apiResponse(res, StatusCodes.OK, {
      token,
      data: { name, email, id },
      ok: true,
      mensaje: "Logeado correctamente",
    });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.message}`,
      ok: false,
    });
  }
};

const Register = async (res, userParam) => {
  const { name, email, password } = userParam;
  try {
    if (name.length < 0) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, { mensaje: "El nombre es obligatorio", ok: false });
    }
    if (email.length < 0) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, { mensaje: "El Email es obligatorio", ok: false });
    }
    if (!isValidEmail(email)) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "El Email no parece tener el formato correcto",
        ok: false,
      });
    }
    if (password.length <= 4) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "La contraseña debe tener mas de 4 caracteres",
        ok: false,
      });
    }


    const emailLowerCase = email.toLocaleLowerCase();
    const passwordHash = bcrypt.hashSync(password);
    console.log("hola")
    const dbResponse = await User.create({ name, email: emailLowerCase, password: passwordHash });

    if (!dbResponse) {
      return apiResponse(res, StatusCodes.NOT_FOUND, { mensaje: "Error, datos invalidos", ok: false });
    }

    const { dataValues } = dbResponse;
    const { id } = dataValues;

    const token = signToken(id, email);
    return apiResponse(res, StatusCodes.OK, {
      token,
      data: { name, email, id },
      ok: true,
      mensaje: "Registrado correctamente",
    });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.message}`,
      ok: false,
    });
  }
};

const CheckToken = async (res, userParam) => {
  const { token = "" } = userParam;
  let id = "";
  try {
    id = await isValidToken(token);
  } catch (error) {
    return apiResponse(res, StatusCodes.BAD_REQUEST, {
      message: "El token no es valido",
      ok: false,
    });
  }
  try {
    const { dataValues: user } = await User.findOne({ where: { id: id } });

    if (!user) {
      return apiResponse(res, StatusCodes.NOT_FOUND, { mensaje: "No se encontro un usuario con ese token", ok: false });
    }
    const { name, email } = user;
    return apiResponse(res, StatusCodes.OK, { token, data: { name, email, id }, ok: true, mensaje: "Token Correcto" });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.message}`,
      ok: false,
    });
  }
};

module.exports = { LogIn, Register, CheckToken };
