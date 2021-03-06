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
  [
    check("username")
      // Every validator method in the validator lib is available as a
      // method in the check() APIs.
      // You can customize per validator messages with .withMessage()
      .isEmail()
      .withMessage("must be an email")

      // Every sanitizer method in the validator lib is available as well!
      .trim()
      .normalizeEmail(),
    check(
      "password",
      "passwords must be at least 5 chars long and contain one number"
    )
      .isLength({ min: 5 })
      .matches(/\d/)
  ],
  function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    let pass2 = req.body.confirmPassword;
    let profileImage = "noimage.jpeg";
    if (!req.file) {
      console.log("no file uploaded");
    } else {
      let profileImage = req.file.filename;
    }
  }
);
module.exports = router;
