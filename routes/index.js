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

module.exports = router;
