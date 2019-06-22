const express = require('express');
var mysql = require('mysql');

const app = express();
const HOST = "dbtest-1.cpkotwvp3rnm.us-east-1.rds.amazonaws.com"

var con = mysql.createConnection({
    host: HOST,
    user: "admin2",
    password: "3BhHQfwjiL"
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
        res.render('index');
});

app.get('/contact', (req, res)=>{
        res.render('contact');
});

app.get('/snake/scores', (req, res)=>{
    con.query("SELECT idscore,name, score, ts FROM nodeSnakeScores.score ORDER BY score DESC LIMIT 10;", function (err,results,fields) {
        // console.log(results);
        res.render('snake/scores',{dbscores: results});
    });
});

app.get('/submitscore/:name/:score', (req, res)=>{
    queryStr = `INSERT INTO nodeSnakeScores.score (name, score) VALUES ("${req.params.name}", ${req.params.score});`;
    console.log(queryStr);
    con.query(queryStr, function (err,results,fields) {
        // console.log(results);
        if (err){
            throw (err);
        }
        res.send('Score submitted');
    });
});

app.get('/submitscore/:name/:score', (req, res)=>{
    queryStr = `INSERT INTO nodeSnakeScores.score (name, score) VALUES ("${req.params.name}", ${req.params.score});`;
    console.log(queryStr);
    con.query(queryStr, function (err,results,fields) {
        // console.log(results);
        if (err){
            throw (err);
        }
        res.send('Score submitted');
    });
});

app.get('/deletescore/:id', (req, res)=>{
queryStr = `DELETE FROM nodeSnakeScores.score WHERE idscore="${req.params.id}";`;
console.log(queryStr);
con.query(queryStr, function (err,results,fields) {
        // console.log(results);
        if (err){
        throw (err);
        }
        res.send('Score deleted');
});
})


    
app.get('/snake', (req, res)=>{
    con.query("SELECT idscore,name, score, ts FROM nodeSnakeScores.score ORDER BY score DESC LIMIT 10;", function (err,results,fields) {
        // console.log(results);
        res.render('snake/index',{dbscores: results});
    });
});

app.listen(80);