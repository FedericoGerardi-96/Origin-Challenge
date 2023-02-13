const { StatusCodes } = require("http-status-codes");

const Action = require("../models/Actions");
const Action_Model = require("../models/Action_Model");
const { apiResponse } = require("../utils/ApiResponse");

const InsertAction = async (res, userParam) => {
  const { symbol, name, currency, exchange, mic_code, country, type, id } = userParam;
  try {
    const dbResponse = await Action.create({ symbol, name, currency, exchange, mic_code, country, type });

    if (!dbResponse) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, { mensaje: "Datos invalidos", ok: false });
    }

    const { dataValues } = dbResponse;
    const idAction = dataValues.id;
    const idUser = id;

    await Action_Model.create({ idUser, idAction });

    return apiResponse(res, StatusCodes.OK, { mensaje: "Agregado correctamente", ok: true });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.mensaje}`,
      ok: false,
    });
  }
};

const DeleteAction = async (res, userParam) => {
  const { id } = userParam;
  try {
    await Action.destroy({
      where: { id: id },
    });

    return apiResponse(res, StatusCodes.OK, { mensaje: "Eliminado correctamente", ok: true });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.mensaje}`,
      ok: false,
    });
  }
};

const GetAction = async (res, userParam) => {
  const { id } = userParam;

  const actionsArray = [];
  const ids = [];

  try {
    const user_Action = await Action_Model.findAll({
      where: {
        idUser: id,
      },
    });

    if (!user_Action) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "El usuario no posee acciones guardadas",
        ok: false,
      });
    }

    user_Action.map((action_model) => {
      ids.push(action_model.dataValues.idAction);
    });

    const actionsRes = await Action.findAll({
      where: {
        id: ids,
      },
    });

    if (!actionsRes) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "El usuario no posee acciones guardadas",
        ok: false,
      });
    }

    actionsRes.map((actions, i) => {
      actionsArray.push(actions.dataValues);
    });
    return apiResponse(res, StatusCodes.OK, {
      mensaje: "Acciones encontradas correctamente",
      ok: true,
      data: actionsArray,
    });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.mensaje}`,
      ok: false,
    });
  }
};

const GetActionId = async (res, userParam) => {
  const { id } = userParam;

  try {
    const dbResponse = await Action.findOne({ where: { id: id } });

    if (!dbResponse) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, {
        mensaje: "No se encontro la accion",
        ok: false,
      });
    }

    const { dataValues } = dbResponse;

    return apiResponse(res, StatusCodes.OK, {
      mensaje: "Acciones encontradas correctamente",
      ok: true,
      data: dataValues,
    });
  } catch (error) {
    return apiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      mensaje: `Error inesperado: ${error.mensaje}`,
      ok: false,
    });
  }
};

module.exports = { InsertAction, DeleteAction, GetAction, GetActionId };
