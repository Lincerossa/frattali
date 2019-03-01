const Sequelize = require("sequelize");
const express = require("express");
const app = express();

require("dotenv").config({ path: "./../.env" });

const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USERNAME,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
  }
);

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/sequelize", function(req, res) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");

      sequelize
        .sync()
        .then(() =>
          User.create({
            username: "compose",
            birthday: new Date(1980, 6, 20),
          })
        )
        .then(e => {
          res.send("utente creato");
        });
    })
    .catch(err => {
      res.send("Unable to connect to the database:", err);
    });
});
app.listen(3002);
