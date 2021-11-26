const mongoose = require("mongoose");
const User = require("../models/User.model");

require("../db");

const users = [
  {
    username: "Sarah",
    email: "sarah@sarah.com",
    password: Sarahñ1234,
    image:
      "https://estaticos.muyinteresante.es/uploads/images/staff/54c8aec73cafe817102ddfca/sarah-muy_0.jpg",
    isAdmin:
      false,
      sex: "Female",
      age: 27,
      hobbies: "Sewing",
  },
];

  User.create(users)
  .then((createdUsers) => {
    console.log(`Created ${createdUsers.length} users`);

    // once they're created, close the connection
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error occurred on the user creation", error)
  );