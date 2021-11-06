const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    image: {
        type: String,
    },
    //this is to show who is the author of the post
    user_id: { 
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    description: String,
    likes: Number, //for the likes from other users 
},{
    timestamps: true,
})

const Post = model("Post", postSchema);

module.exports = Post;
