const Action = require("../models/Actions");
const Action_Model = require("../models/Action_Model");

exports.insertAction = async (req, res, next) => {
  const { symbol, name, currency, exchange, mic_code, country, type, id } = req.body;
  try {
    const { dataValues } = await Action.create({ symbol, name, currency, exchange, mic_code, country, type });
    const idAction = dataValues.id;
    const idUser = id;
    await Action_Model.create({ idUser, idAction });
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(400).json({ mensaje: "Error inesperado" + error.mensaje, ok: false });
  }
};

exports.deleteAction = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Action.destroy({
      where: { id: id },
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(400).json({ mensaje: "Error inesperado" + error.mensaje, ok: false });
  }
};

exports.getAction = async (req, res, next) => {
  const { id } = req.body;
  const actionsArray = [];
  const ids = [];
  try {
    const user_Action = await Action_Model.findAll({
      where: {
        idUser: id,
      },
    });
    if (!user_Action) {
      return res.status(400).json({ mensaje: "El usuario no posee acciones guardadas", ok: false });
    }
    user_Action.map((action_model) => {
      ids.push(action_model.dataValues.idAction);
    });
    const actionsRes = await Action.findAll({
      where: {
        id: ids,
      },
    });
    actionsRes.map((actions, i) => {
      actionsArray.push(actions.dataValues);
    });
    return res.status(200).json({ ok: true, data: actionsArray });
  } catch (error) {
    return res.status(400).json({ mensaje: "Error inesperado" + error.mensaje, ok: false });
  }
};
