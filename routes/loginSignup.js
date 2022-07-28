const express = require("express");
const app = express();
const path = require("path");

const cookieParser = require("cookie-parser");

const { authenticateToken, checkForTokenAndVerify} = require("../functions/authenticationFunctions.js");
const { userModel } = require("../models/User");

app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/client")));
const { generateToken, signupUser } = require("../functions/functions");

//send loginpage if failed to verify token
app.get("/", checkForTokenAndVerify,(req, res) => {
  console.log("sending login page..");
  res.sendFile(path.join(__dirname, "..", "/client/signIn.html"));
});
app.get("/login",checkForTokenAndVerify, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/signIn.html"));
});

//verify login credentials and send token and curruserid in cookies and redirect to dashboard
app.post("/login", async (req, res) => {
  console.log("verifying username and password..");
  let { username, password } = req.body;
  // verify user credentials. Generate and send jwt token
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
    console.log("Forwarding to /dashboard");
     return res.redirect(`/dashboard`);
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
  return res.sendFile(path.join(__dirname, "..", "/client/dashboard.html"));
});

//send signup.html
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/signUp.html"));
});

// verify signup data and redirect to login page. 
//if error render signup page and send
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
