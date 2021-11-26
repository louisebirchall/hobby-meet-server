const mongoose = require("mongoose");
const Hobby = require("../models/Hobby.model");

require("../db");

const hobbies = [
  {
    name: "Sewing",
    type: "Craft",
    description: "Using thread and cloth to make clothes and other items",
    image:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_klook_water/activities/zpv8x9brz0qljjr6mmfl/Sewing%20Class%20in%20Hong%20Kong.jpg",
    placeOfActivity: "Indoors",
  },
];

Hobby.create(hobbies)
  .then((createdHobbies) => {
    console.log(`Created ${createdHobbies.length} hobbies`);

    // once they're created, close the connection
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error occurred on the hobby creation", error)
  );
