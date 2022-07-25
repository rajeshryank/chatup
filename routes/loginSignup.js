const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../functions/functions");
const { userModel } = require("../models/User");
app.use(bodyParser.urlencoded());
app.use(cookieParser());

function validateLoginToken(req, res, next) {
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
const { generateToken, signupUser } = require("../functions/functions");

//send loginpage
app.get("/", validateLoginToken, (req, res) => {
  console.log("sending login page..");
  res.sendFile(path.join(__dirname, "..", "/client/signIn.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/signIn.html"));
});

app.post("/login", async (req, res) => {
  console.log("verifying username and password..");
  let { username, password } = req.body;
  console.log(req.body);
  // verify username and password generate and store jwt token
  let response = await generateToken(username, password);
  if (typeof response == "object") {
    let user = await userModel.find({ username: username });
    let userId = String(user[0]._id);
    res.cookie("jwttoken", response.jwtToken, {
      httpOnly: false,
    });
    res.cookie("currUserId", userId, {
      httpOnly: false,
    });
    return res.redirect("/dashboard");
  } else {
    // send error message
    let errorMessage = response;
    return res.render(
      path.join(__dirname, "..", "/client/render/signin.ejs"),
      { errorMessage }
    );
  }
});

//send dashboard.html after verifying token
app.get("/dashboard", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/dashboard.html"));
});
//send signup.html
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/signUp.html"));
});
// verify signup data and redirect to login page if user created
//else render signup page  and send
app.post("/signup", async (req, res) => {
  let { name, username, password, email } = req.body;
  let response = await signupUser(name, username, password, email);
  if (response == "userCreated") {
    let errorMessage = "Login To continue!";
    return res.render(path.join(__dirname, "..", "/client/render/signin.ejs"), {
      errorMessage,
    });
  }
  if (response == "Email in use!") {
    var emailexist = response;
    var usernameexist = undefined;
    return res.render(path.join(__dirname, "..", "/client/render/signup.ejs"), {
      usernameexist,
      emailexist,
    });
  } else {
    var emailexist = undefined;
    var usernameexist = response;
    return res.render(path.join(__dirname, "..", "/client/render/signup.ejs"), {
      usernameexist,
      emailexist,
    });
  }
});

module.exports = { loginSignupRoute: app };
