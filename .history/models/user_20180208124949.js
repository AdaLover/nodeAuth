const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  profileImage: String
});
mongoose.model("Users", userSchema);
