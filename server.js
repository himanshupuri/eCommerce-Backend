/**
 * This will be the starting file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json()) //middelwhere


/**
 * Create an admin user at the starting of the application
 * if not already present
 */

//Connection with mongodb

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to the mongoDB")
})

db.once("open", ()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})

        if(user){
            console.log("Admin is already present")
            return
        }
        
    }catch(err){
        console.log("Error while reading thye data",err)
    }
    

    try{
        user = await user_model.create({
            name : "Himanshu",
            userId : "admin",
            email : "himanshupuri@gmail.com",
            userType :"ADMIN",
            password : bcrypt.hashSync("Welcome1",8)// 8 is salt Based Hasing
        })

        console.log("Admin created ", user)

    }catch(err){
        console.log("Error while create admin", err)
    }
}


/**
 * Stich the route to the server
 */

// calling routes and passing app object
require("./routes/auth.routes")(app)
/**
 * Start the server
 */

//8080 is  a port number/custmaiztion means change hota rhe gaa....//hard code kardo
app.listen(server_config.PORT, ()=>{
    console.log("Server started at port num : ", server_config.PORT)
})