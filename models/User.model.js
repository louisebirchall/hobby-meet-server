const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    //required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: String,
  profileImage:  {
    type: String,
    default: 'https://png.pngtree.com/png-vector/20190909/ourmidpngtree-outline-user-icon-png-image_1727916.jpg'
  },
  isAdmin: Boolean,
  type: {
    type: String,
    enum:['User', 'Company']
  },
  sex:  {
    type: String,
    enum: ["Female", "Male"],
  },
  age: Number,
 // location: String, // change to dropdown
  hobbies: String,
},{
  timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;
