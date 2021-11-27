const mongoose = require("mongoose");
const Event = require("../models/Event.model");

require("../db");

const events = [];

Event.create(hobbies)
  .then((createdEvents) => {
    console.log(`Created ${createdEvents.length} events`);

    // once they're created, close the connection
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error occurred on the event creation", error)
  );