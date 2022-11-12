const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {Sequelize, DataTypes} = require("sequelize");

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

const agent_contact = sequelize.define(
    "agent_contact_number",
    {
        AgentID : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        
        ContactNo : DataTypes.INTEGER

    },

    { 
        timestamps: false,
        freezeTableName: true
    
    }
)


const client = sequelize.define(
    "client",
    {
        AadharNo: {
            type : DataTypes.INTEGER,
            primaryKey : true
        },

        FirstName : DataTypes.STRING,
        MiddleName : DataTypes.STRING,
        LastName : DataTypes.STRING,

        Age : DataTypes.INTEGER,
        Height : DataTypes.INTEGER,
        Weight : DataTypes.INTEGER,

        DOB : DataTypes.DATE 

    },

    { 
        timestamps: false,
        freezeTableName: true
    
    }
)


// client.create({
//     AadharNo : 3456,
//     FirstName : "Vanshika",
//     MiddleName : "Paresh",
//     LastName : "Shah",
//     Age : 19,
//     Height : 140,
//     Weight : 50,
//     DOB : "2003-5-22"
// })



// agent_contact.create({
//     // AgentID : 1,
//     // ContactNo : 911
// })


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
    let aadhar = req.body.aadhar;

    client.findAll({
        where : {
            AadharNo : aadhar
        }
    }).then(function(response){
        if(response != null){
            res.render("success");
        } else{
            res.render("failure");
        }
    })

})

app.listen(3000, function(){
    console.log("server is up and running on port 3000");
})