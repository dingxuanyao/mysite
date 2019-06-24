const express = require('express');
var mysql = require('mysql');
var fs = require('fs');

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
        res.render('snake/scores',{dbscores: results});
    });
});

app.get('/submitscore/:name/:score', (req, res)=>{
    queryStr = `INSERT INTO nodeSnakeScores.score (name, score) VALUES ("${req.params.name}", ${req.params.score});`;
    con.query(queryStr, function (err,results,fields) {
        if (err){
            throw (err);
        }
        res.send('Score submitted');
    });
});

app.get('/submitscore/:name/:score', (req, res)=>{
    queryStr = `INSERT INTO nodeSnakeScores.score (name, score) VALUES ("${req.params.name}", ${req.params.score});`;
    con.query(queryStr, function (err,results,fields) {
        if (err){
            throw (err);
        }
        res.send('Score submitted');
    });
});

app.get('/deletescore/:id', (req, res)=>{
    queryStr = `DELETE FROM nodeSnakeScores.score WHERE idscore="${req.params.id}";`;
    con.query(queryStr, function (err,results,fields) {
            if (err){
            throw (err);
            }
            res.send('Score deleted');
    });
})


    
app.get('/snake', (req, res)=>{
    con.query("SELECT idscore,name, score, ts FROM nodeSnakeScores.score ORDER BY score DESC LIMIT 10;", function (err,results,fields) {
        res.render('snake/index',{dbscores: results});
    });
});

app.get('/dxy_resume2019.pdf', function (req, res) {
    var filePath = "/dxy_resume2019.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get('*', (req, res)=>{
    res.render('error')
});

app.listen(80);