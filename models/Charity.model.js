const { Schema, model } = require("mongoose");

const charitySchema = new Schema({
    image: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw32wCHHFL9Lz4k_thbFFHTc76wp5lhorzQQ&usqp=CAU'
    },
    name: String,
    description: String,
    //location: coordinates,
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
},{
    timestamps: true,
})

const Charity = model("Charity", charitySchema);

module.exports = Charity;




