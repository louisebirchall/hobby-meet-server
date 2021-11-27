const mongoose = require("mongoose");
const Charity = require("../models/Charity.model");

require("../db");

const charities = [
  {
    image:
      "https://scontent.fvlc6-2.fna.fbcdn.net/v/t1.6435-9/120088167_126103599233246_283390310082932307_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lWvskISA5ygAX-pw3FL&_nc_ht=scontent.fvlc6-2.fna&oh=33676cbd1957ec7be44a4857adfe63b2&oe=61C71779",
    name: "Adopta Gats Valencia",
    description: "Cats, everywhere, and they all need homes",
  },
  {
    image:
      "https://d1kvlp4er3agpe.cloudfront.net/resources/images/groups/0/3/9/9/0/720_nfymsrdiei.jpg",
    title: "Dog Rescue Madrid",
    description: "Helping dogs in need in the Madrid area",
  },
  {
    image:
      "https://daniel-barenboim-stiftung.org/cdn/Media/Media//file-daniel-barenboim---musikalische-schule---credit--peter-adamik-ot5rbqwn43.jpg",
    title: "Daniel Barenboim Stiftung",
    description: "Helping children through music",
  },
];

Charity.create(charities)
  .then((createdCharities) => {
    console.log(`Created ${createdCharities.length} charities`);

    // once they're created, close the connection
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error occurred on the charity creation", error)
  );
