const { Sequelize } = require("sequelize");
const database = "origin";
const username = "root";
const password = "Federico96?";
const host = "localhost";
// const database = process.env.MYSQL_DATABASE;
// const username = process.env.MYSQL_USER;
// const password = process.env.MYSQL_PASSWORD;
// const host = process.env.MYSQL_HOST;

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
