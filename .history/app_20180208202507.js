var express = require("express");
var path = require("path");
var session = require("express-session");
const expressValidator = require("express-validator");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var multer = require("multer");
const flash = require("connect-flash");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nodeAuth");
const db = mongoose.connection;
require("./models/user");

var index = require("./routes/index");
var users = require("./routes/users");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.mul({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

// //handle user session
app.use(session({ secret: "oklie", saveUninitialized: true, resave: true }));

// //passport middleware
app.use(passport.initialize());
app.use(passport.session());

// //expressValidator
app.use(expressValidator({}));

// //express message config
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
