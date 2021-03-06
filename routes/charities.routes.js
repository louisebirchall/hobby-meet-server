const router = require("express").Router();
const Charity = require("../models/Charity.model");
const Review = require("../models/Review.model");
const Post = require("../models/Post.model");
const { isLoggedIn, isAdmin } = require("../middlewares/authoritation");


// The Charities will be created by admins

// create the main charities route (list)
router.get("/", (req, res, next) => {
  Charity.find()
    .populate("posts user_id reviews")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the add charities route
router.post("/create", isAdmin, (req, res, next) => {
  const { name, description, image } = req.body;
  Charity.create({ 
    image, 
    name, 
    description
  })
    .then((data) => res.json(data))
    .catch((err) => {
      next(err);
    });
});

// create the detailed charities route
router.get("/:id", (req, res, next) => {
  Charity.findById(req.params.id)
    .populate("posts user_id reviews")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the review for charity
router.post("/:id/reviews/create", isLoggedIn, (req, res, next) => {
  const { comment, stars } = req.body;
  const { user } = req.session;
  Review.create({ comment, stars, user_id: user._id })
    .then((review) => {
      return Charity.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: review._id } },
        { new: true }
      ).populate("reviews");
    })
    .then((charity) => {
      return res.json({ charity });
    })
    .catch((err) => {
      next(err);
    });
});

// create the post for charities
router.post("/:id/posts/create", isLoggedIn, (req, res, next) => {
  const { description, image } = req.body;
  const { user } = req.session;
  Post.create({ image, description, user_id: user._id })
    .then((post) => {
      return Charity.findByIdAndUpdate(
        req.params.id,
        { $push: { posts: post._id } },
        { new: true }
      ).populate("posts");
    })
    .then((charity) => {
      return res.json({ charity });
    })
    .catch((err) => {
      next(err);
    });
});

// create the edit charities route
// router.patch because patch will only update the specific/chosen charity _> /:id
router.patch("/:id", isAdmin, (req, res, next) => {
  const { name, description, image } = req.body;
  Charity.findByIdAndUpdate(
    req.params.id,
    { image, name, description },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete charities route
// router.delete
// after deleting the charity => redirect to charities list ("/") ?
router.delete("/:id", isAdmin, (req, res, next) => {
  Charity.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
});

module.exports = router;
