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


const agent = sequelize.define(
    "agent",
    {
        AgentID: {
            type : DataTypes.INTEGER,
            primaryKey : true
        },

        FirstName : DataTypes.STRING,
        MiddleName : DataTypes.STRING,
        LastName : DataTypes.STRING,

        Age : DataTypes.INTEGER,
        Income : DataTypes.INTEGER,
        Type : DataTypes.STRING,

        DOB : DataTypes.DATE 

    },

    { 
        timestamps: false,
        freezeTableName: true
    
    }
)


const policy = sequelize.define(
    "policy",
    {
        PolicyCode : DataTypes.INTEGER,
        PolicyBenefits : DataTypes.STRING,
        Tenure : DataTypes.INTEGER,
        Type : DataTypes.STRING,
        Premium : DataTypes.STRING,
        AadharNo : DataTypes.INTEGER

    },

    { 
        timestamps: false,
        freezeTableName: true
    
    }
)
policy.removeAttribute('id');
let policyList = [];


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
    let aadhar = req.body.pkey;

    client.findAll({
        where : {
            AadharNo : aadhar
        }
    }).then(function(clientInfo){
        if(clientInfo.length != 0){

            console.log(clientInfo[0].dataValues.FirstName);
            res.render("successclient",{

                firstName: clientInfo[0].dataValues.FirstName,
                lastName : clientInfo[0].dataValues.LastName,
                age : clientInfo[0].dataValues.Age,
                height : clientInfo[0].dataValues.Height,
                weight : clientInfo[0].dataValues.Weight,
                //policycodes : policyList

            });
        } else{
            console.log("user not found");
            res.render("failure");
        }
    })

})

app.post("/agent", function(req, res){
    let email = req.body.email;
    let agendid = req.body.pkey;

    agent.findAll({
        where : {
            AgentID : agendid
        }
    }).then(function(agentInfo){
        if(agentInfo.length != 0){
            console.log(agentInfo[0].dataValues);

            res.render("successagent", {
                firstName : agentInfo[0].dataValues.FirstName,
                lastName : agentInfo[0].dataValues.LastName,
                age : agentInfo[0].dataValues.Age,
                income : agentInfo[0].dataValues.Income,
                type : agentInfo[0].dataValues.Type
            })

        }else{
            res.render("failure")
            console.log("Agent not found");
        }
    })
})

app.get("/currentAgent", function(req, res){
    //res.send("Hello")


})


app.listen(3000, function(){
    console.log("server is up and running on port 3000");
})