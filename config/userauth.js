const localStrategy = require("passport-local");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

//Import Data Base File
const database = require("../helpers/database");
// Mysql Connect
const conn = mysql.createConnection(database);
conn.connect();


module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        let Query = `SELECT * FROM userschema WHERE username='${email}'`;
        let PasswordMatch = false;
        conn.query(Query, (err, user) => {
            if (err) {
                console.log(err);
                return;
            }
            if (user.length == 0) {
                return done(null, false, { message : "User Not Find" });
            }
            if (user[0].username != email) {
                return done(null, false, { message : "User Not Find" });
            } else {
                bcrypt.compare(password, user[0].password, (err, IsMatch) => {
                    if (err) throw err;
                    if (IsMatch) {
                       user = user[0];
                        return done(null, user);
                    } else {
                        return done(null, false, { message : "Password Not Match" });
                    }
                });
            }
        });

    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {       
        conn.query(`SELECT * FROM userschema WHERE id='${id}'`,(err,user) =>{
            done(err,user);
            
        })
      });
}


