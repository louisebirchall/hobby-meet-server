const { Schema, model } = require("mongoose");

const hobbySchema = new Schema(
  {
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
      ],
    },
    description: String,
    hobbyImage: String,
    placeOfActivity: {
      type: String,
      enum: ["Indoors", "Outdoors", "Indoors/Outdoors"],
    },
    post_id: [
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
