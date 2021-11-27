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
  {
    name: "Photography",
    type: "Art",
    description:
      "Taking pictures, whether digital or on film, and improving technique",
    image:
      "https://lh3.googleusercontent.com/proxy/xyZZaJm-Owqe3u_noM3l-7IeOCb6tfiWpmnXKH_DvOp3O_NEEsaPmw3mtTOczALeZ1k37KzyfkpWykaiuhcx9tuGYLySpWgQyTY",
    placeOfActivity: "Indoors/Outdoors",
  },
  {
    name: "Climbing",
    type: "Sport",
    description: "Using your body to scale heights, all levels welcome",
    image:
      "https://www.collinsdictionary.com/images/full/climbing_387899734_1000.jpg",
    placeOfActivity: "Indoors/Outdoors",
  },
  {
    name: "Jigsaw Puzzles",
    type: "Manual",
    description: "Something relaxing to do by yourself or as a family",
    image:
      "https://d2qpatdq99d39w.cloudfront.net/wp-content/uploads/2020/03/31124604/best-puzzles-for-adults-1.jpg",
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
