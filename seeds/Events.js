// const mongoose = require("mongoose");
// const Event = require("../models/Event.model");

// require("../db");

// const events = [
//     {
//         image: "https://media.istockphoto.com/photos/sewing-class-picture-id518831826?k=20&m=518831826&s=612x612&w=0&h=rYaSLvWwTh55-oEDIJZtH-c7pUciduWkF1qkSGhgY9c=",
//         title: "Starter Sewists",
//         description: "For beginners to discuss any questions they may have and more experienced sewers to offer tips and advice",
//         date: "07/12/2021",
//         attendees: "4",
//         attendees_max: "12",
//         attendees_min: "2",
//         pricePolicy: "Free",
//         location: "Zoom, link to follow",
//     //     organizedBy:,
//     //     charity_id:,
//     // },
//         {
//         image: "https://media.istockphoto.com/photos/sewing-class-picture-id518831826?k=20&m=518831826&s=612x612&w=0&h=rYaSLvWwTh55-oEDIJZtH-c7pUciduWkF1qkSGhgY9c=",
//         title: "Starter Sewists",
//         description: "For beginners to discuss any questions they may have and more experienced sewers to offer tips and advice",
//         date: "07/12/2021",
//         attendees: "4",
//         attendees_max: "12",
//         attendees_min: "2",
//         pricePolicy: "Free",
//         location: "Zoom, link to follow",
//     //     organizedBy:,
//     //     charity_id:,
//     // },
//         {
//         image: "https://media.istockphoto.com/photos/sewing-class-picture-id518831826?k=20&m=518831826&s=612x612&w=0&h=rYaSLvWwTh55-oEDIJZtH-c7pUciduWkF1qkSGhgY9c=",
//         title: "Starter Sewists",
//         description: "For beginners to discuss any questions they may have and more experienced sewers to offer tips and advice",
//         date: "07/12/2021",
//         attendees: "4",
//         attendees_max: "12",
//         attendees_min: "2",
//         pricePolicy: "Free",
//         location: "Zoom, link to follow",
//     //     organizedBy:,
//     //     charity_id:,
//     // },
// ]

// Event.create(hobbies)
//   .then((createdEvents) => {
//     console.log(`Created ${createdEvents.length} events`);

//     // once they're created, close the connection
//     mongoose.connection.close();
//   })
//   .catch((error) =>
//     console.log("An error occurred on the event creation", error)
//   );