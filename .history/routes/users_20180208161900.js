var express = require("express");
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");
var router = express.Router();
var multer = require("multer");
var mongoose = require("mongoose");
const User = mongoose.model("Users");
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    console.log(file);
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage });
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", function(req, res, next) {
  res.render("register");
});
router.get("/login", function(req, res, next) {
  res.render("login");
});
router.post(
  "/register",
  upload.single("picture"),

  function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    let pass2 = req.body.confirmPassword;
    let profileImage = "noimage.jpeg";
    req.check("email", "email cannot be empty").notEmpty();
    req.check("password", "password cannot be empty").notEmpty();
    req
      .check("password", "password should not be less than 5")
      .isLength({ min: 5 });
    req.check("email", "email should contain @").isEmail();
    req
      .check("confirmPassword", "passwords do not match")
      .equals(req.body.password);

    console.log(req);

    let errors = req.validationErrors();
    if (errors) {
      res.render("register", { errors: errors });
    } else {
      let user = new User({ email, pass, profileImage });
      user.save(async (err, data) => {
        if (err) console.log("err", err);
        else {
          console.log(data);
        }
      });
    }
  }
);
module.exports = router;
