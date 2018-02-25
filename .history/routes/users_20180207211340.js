var express = require("express");
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");
var router = express.Router();
var multer = require("multer");
const upload = multer({ dest: "./uploads" });
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
    req.check("email", "email must have @").isEmpty.isEmail();
  }
);
module.exports = router;
