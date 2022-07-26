require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateLoginToken(req, res, next) {
    let token = req.cookies.jwttoken;
    if (!token) {
      console.log("No token... ");
      return next();
    }
    jwt.verify(token, process.env.signature, (err, decodedToken) => {
      if (err) {
        return next();
      }
      console.log("Authentication successful!");
      return res.redirect("/dashboard");
    });
  }

  //jwt authentication function
function authenticateToken(req, res, next) {
    let token = req.cookies.jwttoken
    if (!token) {
      return res.redirect("/login")}
    jwt.verify(token, process.env.signature, (err, decodedToken) => {
      if (err) {
        return res.redirect("/login")
      }
      next();
    });
  }

module.exports = {authenticateToken, authenticateLoginToken}