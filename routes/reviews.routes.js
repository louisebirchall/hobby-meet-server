const router = require("express").Router();
const Review = require("../models/Review.model");
const { isLoggedIn } = require("../middlewares/authoritation");


// the create reviews route is in each place that is having a review created

// create the detailed posts route
router.get("/:id", (req, res, next) => {
  Review.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the edit posts route
router.patch("/:id", isLoggedIn, (req, res, next) => {
  const { comment, stars } = req.body;
  Review.findByIdAndUpdate(req.params.id, { comment, stars }, { new: true })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete posts route
// after deleting the review => redirect to the create review? (Not sure where will be better to redirect)
router.delete("/:id", isLoggedIn, (req, res, next) => {
  Review.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
});

module.exports = router;
