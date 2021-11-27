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
    isAdmin: false,
    sex: "Female",
    age: 27,
    hobbies: "Sewing",
  },
  {
    username: "John",
    email: "john@john.com",
    password: Johnñ1234,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/John_Denver_1974.jpg",
    isAdmin: false,
    sex: "Male",
    age: 43,
    hobbies: "Photography",
  },
  {
    username: "Ana",
    email: "ana@ana.com",
    password: Anañ1234,
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ana-brenda-contreras-diezminutos-1623306359.jpg",
    isAdmin: false,
    sex: "Female",
    age: 25,
    hobbies: "Climbing",
  },
  {
    username: "Dave",
    email: "dave@dave.com",
    password: Daveñ1234,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/John_Denver_1974.jpg",
    isAdmin: false,
    sex: "Male",
    age: 35,
    hobbies: "Jigsaw Puzzles",
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