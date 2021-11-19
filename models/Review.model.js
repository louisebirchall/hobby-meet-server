const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    comment: String,
    likes: Number,
    dislikes: Number,
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
