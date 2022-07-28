require("dotenv").config();
const jwt = require("jsonwebtoken");


//call next if no token or error. Else send dashboard
function checkForTokenAndVerify(req, res, next) {
  console.log("inside checkForTokenAndVerify");
    let token = req.cookies.jwttoken;
    let currUserId = req.cookies.currUserId
    if (!token || !currUserId) {
      console.log("No token or currUserId!");
      return next();
    }
    jwt.verify(token, process.env.signature, (err, decodedToken) => {
      if (err) {
        console.log(err, "ERR WHILE VERIFYING");
        return next();
      } 
      if(decodedToken.userId== currUserId){
      console.log("Token already present and verified.. ");
      return res.redirect("/dashboard")
    }else{
      return next()
      }
    });
  }

 //redirect to login page if error or no token else call next
function authenticateToken(req, res, next) {
    let token = req.cookies.jwttoken
    let currUserId = req.cookies.currUserId
    if (!token || !currUserId) {
      return res.redirect("/login")}
    jwt.verify(token, process.env.signature, (err, decodedToken) => {
      if (err) {
        console.log("Verification failed!!");
        return res.redirect("/login")
      }
      let tokenUserId = decodedToken.userId
      console.log(tokenUserId, decodedToken.userId);
      if(currUserId==tokenUserId) { 
        console.log("tokens matching")
        return next()
      }else {
        console.log("not matching verificationn failed!!")
        return res.redirect("/login")
      }
     
    });
  }

module.exports = {authenticateToken, checkForTokenAndVerify}