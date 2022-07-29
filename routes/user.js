const express = require("express");
const app = express();
const { userModel } = require("../models/User");
const { authenticateToken } = require("../functions/authenticationFunctions.js");

app.use(express.urlencoded({
    extended: true
  }));

  // send all other user info except the requesting user's
app.get("/user/:userid", authenticateToken, async (req,res)=>{
    try {
        let data =  await userModel.find()
        let userid =req.params.userid
        let filteredData = []
        data.forEach( eachObject=>{if(eachObject._id.toString() != userid) {
            // let username = eachObject.username
            filteredData.push([eachObject.name,eachObject.username, 
                eachObject._id.toString(), eachObject.email, eachObject.phoneNo])
        }})
        // console.log(filteredData)
        return res.json(filteredData)
        
    } catch (error) {
        res.sendStatus(500).json(error)
    }
})

//send requesting user info
app.get("/userinfo/:userid", authenticateToken, async (req,res)=>{
    try {
        let data = await userModel.findById(req.params.userid)
        if(data) {
            return res.json(data)
        } else{
            return res.json("User Not found")
        }
    } catch (error) {
        res.sendStatus(500).json(error)
    }
})


module.exports = {userRoute:app}