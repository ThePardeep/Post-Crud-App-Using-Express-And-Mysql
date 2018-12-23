const express = require("express");
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require('express-session');
//const multer = require("multer");

//Init Express app
const app = express();
const Port = process.env.PORT || 3000;

//Static Folder
app.use(express.static(path.join(__dirname, "./public")));

// Express session midleware
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));

//Passport Middelware

app.use(passport.initialize());
app.use(passport.session());

//Flash Middeleware
app.use(flash());



//Local Variable 
app.use(function (req, res, next) {
   res.locals.error = req.flash('error');
   res.locals.success_msg = req.flash("success_msg");
   res.locals.error_msg = req.flash("error_msg");
   res.locals.err_verify = req.flash("err_verify");
   res.locals.user = req.user || null;
   next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set View Path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Home Route 
app.get("/", (req, res) => {
   res.render("index");
});

// About Route
app.get("/about", (req, res) => {
   res.render("about");
});



const posts = require("./route/posts");
app.use("/post", posts);

const user = require("./route/user");
app.use("/user", user);

// Start Server 
app.listen(Port, () => console.log(`Server Running At Port ${Port}`));