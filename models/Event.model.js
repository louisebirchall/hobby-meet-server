const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema({
  name: String,
//   forHobby: String { Hobby },
  location: Coordinates,
  date: Date,
  description: String,
//   numberOfAttendees: {
//     maxNumber, minNumber
//   },
//   usersAttending: { User },
  eventImage: String, 
  equipment: String,
  price: {
      Number,
      String,
  }
});

const Event = model("Event", eventSchema);

module.exports = Event;
