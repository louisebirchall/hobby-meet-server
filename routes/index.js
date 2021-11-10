const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const hobbiesRoutes = require("./hobbies.routes");
router.use("/hobbies", hobbiesRoutes);

const eventsRoutes = require("./events.routes");
router.use("/events", eventsRoutes);

const charitiesRoutes = require("./charities.routes");
router.use("/charities", charitiesRoutes);

const productRoutes = require("./products.routes")
router.use("/products", productRoutes)

const postRoutes = require("./posts.routes")
router.use("/posts", postRoutes)

const reviewRoutes = require("./reviews.routes")
router.use("/reviews", reviewRoutes)

module.exports = router;
