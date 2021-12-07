const mongoose = require("mongoose");
const Event = require("../models/Event.model");

require("../db");

const events = [
  {
    image:
      "https://media.istockphoto.com/photos/sewing-class-picture-id518831826?k=20&m=518831826&s=612x612&w=0&h=rYaSLvWwTh55-oEDIJZtH-c7pUciduWkF1qkSGhgY9c=",
    title: "Starter Sewists",
    description:
      "For beginners to discuss any questions they may have and more experienced sewers to offer tips and advice",
    date: "07/12/2021",
    // attendees: "4",
    // attendees_max: "12",
    // attendees_min: "2",
    pricePolicy: "Free",
    location: "Zoom, link to follow",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/%E3%83%9C%E3%83%AB%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0_%287955003588%29.jpg/220px-%E3%83%9C%E3%83%AB%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0_%287955003588%29.jpg",
    title: "Bouldering Thursdays",
    description:
      "Come along and give it a try, or compete with others. All covid protocols are being followed",
    date: "07/12/2021",
    user_id: "6197c49cd3ec94fa96d0f9f5",
    // attendees: "6",
    // attendees_max: "20",
    // attendees_min: "2",
    pricePolicy: "Free",
    location: "The Bunker",
    coordinates: [-0.351891, 39.4662841],
  },
  {
    image:
      "https://picturecorrect-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/perspective-image.jpg",
    title: "Perspective Workshop",
    description:
      "Come and learn about perspective, how to frame photos and get the best images",
    date: "07/12/2021",
    // attendees: "7",
    // attendees_max: "10",
    // attendees_min: "2",
    pricePolicy: "Free",
    location: "Zoom, link to follow",
  },
];

Event.create(events)
  .then((createdEvents) => {
    console.log(`Created ${createdEvents.length} events`);

    // once they're created, close the connection
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error occurred on the event creation", error)
  );