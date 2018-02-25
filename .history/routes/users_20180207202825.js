var express = require("express");
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
router.post("/register", upload.single("picture"), function(req, res, next) {
  console.log(req.body);
});
module.exports = router;
