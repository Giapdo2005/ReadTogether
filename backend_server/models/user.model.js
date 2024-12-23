const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
