const apiResponse = (res, statusCode, result) => {
  return res.status(statusCode).json(result);
};

module.exports = { apiResponse };
