const express = require("express");
const mysql = require("mysql");
const Router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth")

// Mysql Connect
const conn = mysql.createConnection({
   host: 'localhost',
   user: 'CK_APP',
   password: "CK_APP&@",
   database: "ckapp"
})
conn.connect();

Router.get("/add", ensureAuthenticated, (req, res) => {
   res.render("posts/addpost");
});

Router.post("/insert", ensureAuthenticated, (req, res) => {
   let PostData = {
      title: req.body.title,
      body: req.body.body
   }
   let error = {};
   let i = 0;
   if (PostData.title === "") {
      i = 1;
      error.err_title = "Enter Correct Title";
   }
   if (PostData.body === "") {
      i = 1;
      error.err_body = "Enter correct Content";
   }
   if (i === 1) {
      error = JSON.stringify(error);
      req.flash("error_msg", error);
      req.flash("err_verify", "OK")
      res.redirect("/post/add");
   } else {
      conn.query(`INSERT INTO posts (title, body,user_id) VALUES ('${PostData.title}','${PostData.body}','${req.user[0].id}')`, (err) => {
         if (err) {
            console.log(err);
         } else {
            req.flash("success_msg", "Post Insert Successfully");
            res.redirect("/post/all");
         }
      });
   }
});


// Route Show All Posts

Router.get("/all", ensureAuthenticated, (req, res) => {
   conn.query(`SELECT * FROM posts WHERE user_id='${req.user[0].id}'`, (err, row) => {
      if (err) {
         console.log(err);
      } else {
         res.render("posts/allposts", {
            data: row,
         });
      }
   });
});

//Delete Post
Router.get("/delete/:id", ensureAuthenticated, (req, res) => {
   conn.query(`SELECT user_id FROM posts WHERE id='${req.params.id}'`, (err, row) => {
      if (err) throw err;
      if (row[0].user_id === req.user[0].id) {
         conn.query(`DELETE FROM posts WHERE id=${req.params.id}`, (err) => {
            if (err) {
               console.log(err);
            } else {
               req.flash("success_msg", "Post Remove Successfully");
               res.redirect("/post/all");
            }
         });
      } else {
         req.flash("error", "Not Authorized");
         res.redirect("/post/all");
      }
   });
});

//Edit Post
Router.get("/edit/:id", ensureAuthenticated, (req, res) => {
   conn.query(`SELECT * FROM posts WHERE id=${req.params.id}`, (err, row) => {
      if (err) {
         console.log(err);
      } else {
         res.render("posts/edit", {
            data: row
         });
      }
   });
});

// Edit Post POST Route
Router.post("/edit", ensureAuthenticated, (req, res) => {

   let PostData = {
      title: req.body.title,
      body: req.body.body,
      id: req.body.pid
   };
   conn.query(`SELECT user_id FROM posts WHERE id='${PostData.id}'`, (err, row) => {
      if (err) throw err;
      if (req.user[0].id === row[0].user_id) {
         conn.query(`UPDATE posts SET title = '${PostData.title}', body = '${PostData.body}' WHERE id=${PostData.id}`, (err) => {
            if (err) {
               console.log(err);
            } else {
               req.flash("success_msg", "Post Update Successfully");
               res.redirect("/post/all");
            }
         });
      } else {
         req.flash("error", "Not Authorized");
         res.redirect("/post/all");
      }
   })
});

module.exports = Router;