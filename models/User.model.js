const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      require: true, // still doesn't print in MongoDb
    },
    password: {
      type: String,
      require: true,
    },
    fullName: String,
    image: {
      type: String,
      default:
        "https://i.pinimg.com/736x/e5/ed/80/e5ed80c10d1fb9aae22c8dfda9b094c2.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["User", "Company"],
    },
    sex: {
      type: String,
      enum: ["Female", "Male"],
    },
    age: Number,
    // location: String, // change to dropdown
    hobbies: String,
    events: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
