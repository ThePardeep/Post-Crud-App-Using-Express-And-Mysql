const express = require("express");
const Router = express.Router();
const mysql = require("mysql");
const path = require("path");
const bcrypt = require('bcryptjs');
const app = express();
const passport = require("passport");

//UserAuth File Import

require("../config/userauth")(passport);

//Import Data Base File
const database = require("../helpers/database");
// Mysql Connect
const conn = mysql.createConnection(database);
conn.connect();

//Login Route
Router.get("/login", (req, res) => {
    res.render("forms/login");
});

// Register Acc Get
Router.get("/register", (req, res) => {
    res.render("forms/registration");
});


//Register User Post
Router.post("/register", (req, res) => {
    let error = {};
    let i = 0;
    if (req.body.email === "") {
        error.err_email = "Pls Enter Email";
        i = 1;
    }
    if (req.body.password === "") {
        i = 1;
        error.err_password = "Pls Enter Password";
    }

    if (i === 1) {
        error = JSON.stringify(error);
        req.flash("error_msg", error);
        req.flash("err_verify", "OK")
        res.redirect("/user/register");
    } else {
        let UserData = {
            username: req.body.email,
            password: req.body.password
        }
        //Check Email 
        let Query = "SELECT username FROM userschema";
        let ALLEMAILS = conn.query(Query, (err, row) => {
            if (err) throw err;
            let error = { err_user_exist: "User Already Exist" };
            var i = 0;
            for (let index = 0; index < row.length; index++) {
                if (row[index].username === UserData.username) {
                    i = 1;
                    break;
                }
            }
            if (i === 1) {
                error = JSON.stringify(error);
                req.flash("error_msg", error);
                req.flash("err_verify", "OK")
                res.redirect("/user/register");
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(UserData.password, salt, (err, hash) => {
                        if (err) throw err;
                        UserData.password = hash;
                        conn.query(`INSERT INTO userschema (username, password) VALUES ('${UserData.username}', '${UserData.password}')`, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash("success_msg", "User Registration Success");
                                res.redirect("/user/login");
                            }
                        });
                    });
                });
            }
        });
    }
});

// Login Post 
Router.post("/login", (req, res, next) => {

    let error = {};
    let i = 0;
    if (req.body.email === "") {
        error.err_email = "Pls Enter Email";
        i = 1;
    }
    if (req.body.password === "") {
        i = 1;
        error.err_password = "Pls Enter Password";
    }

    if (i === 1) {
        error = JSON.stringify(error);
        req.flash("error_msg", error);
        req.flash("err_verify", "OK")
        res.redirect("/user/login");
    } else {
        passport.authenticate("local", {
            failureRedirect: "/user/login",
            successRedirect: "/post/all",
            failureFlash: true
        })(req, res, next);
    }
});

Router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
})

module.exports = Router;