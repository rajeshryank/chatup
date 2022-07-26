require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { userModel } = require("../models/User");
var cl = console.log;

//helper functions
async function connectToDb() {
  try {
    cl("Connecting to database..");
      mongoose.connect(process.env.mongoUri);
    cl("Connection successfull!");
    return "Connection successfull!";
  } catch (error) {
    cl(error);
    return error;
  }
}
function hashPassword(password) {
  cl("Hashing user password...");
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  cl("Password hash successfull!");
  return hash;
}

//main functions

//verify login credentials and generate token if success
async function generateToken(username, password) {
  try {
    cl("Finding matching account..");
    let userInfo = await userModel.findOne({ username: username });
    if (userInfo) {
      //match password and username
      let verified = bcrypt.compareSync(password, userInfo.hash);
      if (userInfo.username == username && verified) {
        let userId = userInfo._id.toString()
        let payload = {username: username, userId:userId};
        let token = jwt.sign(payload, process.env.signature, {
          algorithm: "HS384",
          expiresIn: "1d",
        });
        let response = {
          jwtToken: token,
          message: "Authentication successfull",
        };
        console.log("response", response);
        return response;
      } else {
        console.log("invalid password");
        return "Invalid password";
      }
    } else {
      console.log("user not found")
      return "User Not Found, please signup.";
    }
  } catch (error) {
    return error
  }
}

// signup user. Send error message if invalid/duplicate
async function signupUser(name, username, password, email) {
  let userDontExist = await userModel.isEmailDuplicate(email)
  let usernameDontExist = await userModel.isUsernameDuplicate(username)
  if(!userDontExist) return "Email in use!"
  if(!usernameDontExist) return "Username in use!"
    let hash = hashPassword(password);
    let newUser = new userModel({
      name: name,
      username: username,
      email:email,
      hash: hash
    });
    try {
      cl("Adding new user..");
      await newUser.save();
      cl(`${name} user has been created successfully`);
      return "userCreated"
    } catch (error) {
      cl(error);
      return error;
    }
  }


module.exports = { connectToDb, generateToken, signupUser };
