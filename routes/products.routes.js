const router = require("express").Router();
const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const fileUploader = require("../middlewares/cloudinary.config")

// create the main products route (list)
router.get("/", (req, res, next) => {
    Product.find().populate("user_id reviews")
     .then((data) => res.json(data))
     .catch((err) => next(err));
  });

// create the add products route
router.post("/create", fileUploader.single("productImage"), (req, res, next) => {
    const {title, description, pricePolicy, price} = req.body;
    const productImage = req.file.path;
    const { user } = req.session;
    Product.create({title, productImage, description, pricePolicy, price, user_id: user._id })
    .then((data) => res.json(data))
    .catch((err) => {next(err)});
})

// create the detailed products route
router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id).populate("user_id reviews")
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

// create the review for events
router.post("/:id/reviews/create", (req, res, next) => {
  const { comment, stars } = req.body;
  const { user } = req.session;
  Review.create({ comment, stars, user_id: user._id })
      .then((review) => {
        return Product.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } }, { new: true }).populate("reviews")
      })
      .then((product) => {
        return res.json({ product })
      })
      .catch((err) => {next(err)});  
  }); 

// create the edit products route
router.patch("/:id", fileUploader.single("productImage"), (req, res, next) => {
    const {title, description, pricePolicy, price} = req.body;
    const productImage = req.file.path;
    Product.findByIdAndUpdate(
    req.params.id,
    {title, productImage, description, pricePolicy, price} ,
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete products route
// after deleting the charity => redirect to Products list ("/") ?
router.delete("/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then((data) => res.json(data._id))
      .catch((err) => next(err));
  });



module.exports = router;