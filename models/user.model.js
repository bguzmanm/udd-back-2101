const { default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    uppercase: true,
  },
  username: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, "Invalid Email"],
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    require: false,
  },
  salt: String,
});

userSchema.plugin(uniqueValidator, { message: 'username or email is already registered' });

userSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

userSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.password === hash;
}

const user = mongoose.model("users", userSchema);
module.exports = user;