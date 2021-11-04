const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  realName: String,
  email: String,
  profilePic: String,
  isAdmin: Boolean,
  age: Number,
  Hobbies: {},
  location: String, // change to dropdown
});

const User = model("User", userSchema);

module.exports = User;
