const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Samarth2002#"
});

con.connect(function(err) {
    if(err){
        console.log(err);
    }else{
        console.log("Connected!");
    }
});

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home", {
        content : "Hello there"
    })
})

app.get("/client", function(req, res) {
    res.render("client")
})

app.get("/agent", function(req, res) {
    res.render("agent")
})

app.post("/client", function(req, res){
    let email = req.body.email;
    let pwd = req.body.pwd;

    console.log(email);

    if(email == "samarth@gmail.com"){
        res.render("success")
    }
    else{
        console.log("failure");
    }

})

app.listen(3000, function(){
    console.log("server is up and running on port 3000");
})