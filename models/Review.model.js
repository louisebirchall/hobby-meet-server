const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    stars: Number,
},{
    timestamps: true,
})

const Review = model("Post", reviewSchema);

module.exports = Review;