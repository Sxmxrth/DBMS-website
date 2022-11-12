const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "medisurance",
    "root",
    "Samarth2002#",
    {
        host : "localhost",
        dialect : "mysql"
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.sync().then(() => {
    
    agent_contact_number.create({
        AgentID : 1,
        ContactNo : 911
    }).then(function(res){
        console.log(res);
    }).catch((error) => {
        console.log("failed to create new record");
    })




 }).catch((error) => {
    console.error('Unable to create table : ', error);
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