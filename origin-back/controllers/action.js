const { InsertAction, DeleteAction, GetAction, GetActionId } = require("../services/actionService");

exports.insertAction = async (req, res) => await InsertAction(res, req.body);

exports.deleteAction = async (req, res) => await DeleteAction(res, req.body);

exports.getAction = async (req, res) => await GetAction(res, req.body);

exports.getActionId = async (req, res) => await GetActionId(res, req.body);
