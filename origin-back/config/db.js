const { Sequelize } = require("sequelize");

const database = "origin";
const username = "root";
const password = "Federico96";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySql Coneccion correcta...");
  } catch (error) {
    console.log(error.message);
    console.log("MySql Coneccion Erronea...");
  }
};

module.exports = { dbConnectMySql, sequelize };
