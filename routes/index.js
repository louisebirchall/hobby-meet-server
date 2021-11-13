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

const productsRoutes = require("./products.routes");
router.use("/products", productsRoutes);

const postsRoutes = require("./posts.routes");
router.use("/posts", postsRoutes);

const reviewsRoutes = require("./reviews.routes");
router.use("/reviews", reviewsRoutes);

router.post("/upload", imageUploader.single('postImage'),(req, res, next) => {
  if(!req.file){
    next(new Error("No file upload!"))
    return; 
  }
  res.json({ imagePath: req.file.path })
})

module.exports = router;
