const router = require("express").Router();
const imageUploader = require("../middlewares/cloudinary.config.js");

// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const hobbiesRoutes = require("./hobbies.routes");
router.use("/hobbies", hobbiesRoutes);

const eventsRoutes = require("./events.routes");
router.use("/events", eventsRoutes);

const charitiesRoutes = require("./charities.routes");
router.use("/charities", charitiesRoutes);

const productsRoutes = require("./products.routes");
router.use("/products", productsRoutes);

const postsRoutes = require("./posts.routes");
router.use("/posts", postsRoutes);

const reviewsRoutes = require("./reviews.routes");
router.use("/reviews", reviewsRoutes);

const generalRoutes = require("./general.routes");
router.use("/", generalRoutes);



module.exports = router;
