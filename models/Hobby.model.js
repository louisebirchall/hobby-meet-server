const { Schema, model } = require("mongoose");

const hobbySchema = new Schema({
    name: String,
    typeOfActivity: {
      type: String,
      enum: [
        "Sport",
        "Craft",
        "Workshop",
        "Music",
        "Art",
        "Manual",
        "Food",
        "Gardening",
        "MeetUp",
        "Language",
        "Spiritual",
        'Photography'
      ],
    },
    description: String,
    image: String,
    placeOfActivity: {
      type: String,
      enum: ["Indoors", "Outdoors", "Indoors/Outdoors"],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hobby = model("Hobby", hobbySchema);

module.exports = Hobby;
