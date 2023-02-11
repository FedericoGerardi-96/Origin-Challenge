const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const { dbConnectMySql } = require("./config/db");

const app = express();

const user = require("./routers/user");
const action = require("./routers/action");

dbConnectMySql();

app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.use("/api/user", user);
app.use("/api/action", action);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log("Servidor ejecutado en ambiente", process.env.NODE_ENV));

process.on("unhandledRejection", (error, promise) => {
  console.log("Errores", error.message);
  server.close(() => process.exit(1));
});
