const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: false },
  document: { type: String, required: false },
  password: { type: String, required: true },
  salt : { type: String },
});

userSchema.methods.setPassword = function (pswd) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(pswd, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};
userSchema.methods.validPassword = function (pswd) {
  let password = crypto
    .pbkdf2Sync(pswd, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === password;
};

module.exports = mongoose.model("User", userSchema);
