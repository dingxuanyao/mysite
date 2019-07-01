const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config.json");

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});

router.get("/", (req, res) => {
  con.query(
    "SELECT idscore,name, score, ts FROM nodeSnakeScores.score ORDER BY score DESC LIMIT 10;",
    function(err, results, fields) {
      res.render("snake/index", { dbscores: results });
    }
  );
});

router.get("/scores", (req, res) => {
  con.query(
    "SELECT idscore,name, score, ts FROM nodeSnakeScores.score ORDER BY score DESC LIMIT 10;",
    function(err, results, fields) {
      res.render("snake/scores", { dbscores: results });
    }
  );
});

router.get("/submitscore/:name/:score", (req, res) => {
  queryStr = `INSERT INTO nodeSnakeScores.score (name, score) VALUES ("${
    req.params.name
  }", ${req.params.score});`;
  con.query(queryStr, function(err, results, fields) {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

router.get("/deletescore/:id", (req, res) => {
  queryStr = `DELETE FROM nodeSnakeScores.score WHERE idscore="${
    req.params.id
  }";`;
  con.query(queryStr, function(err, results, fields) {
    if (err) {
      throw err;
    }
    res.send("Score deleted");
    location.reload();
  });
});

module.exports = router;
