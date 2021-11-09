const router = require("express").Router();
const Review = require("../models/Review.model");

// create the add posts route
router.post("/create", (req, res, next) => {
    const {comment, stars} = req.body;
    Review.create({comment, stars})
        .then((data) => res.json(data))
        .catch((err) => {next(err)});
})

// create the detailed posts route
router.get("/:id", (req, res, next) => {
    Review.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

// create the edit posts route
router.patch("/:id", (req, res, next) => {
    const {comment, stars} = req.body;
    Review.findByIdAndUpdate(req.params.id, {comment, stars} , { new: true })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete posts route
// after deleting the review => redirect to the create review? (Not sure where will be better to redirect)
router.delete("/:id", (req, res, next) => {
    Review.findByIdAndDelete(req.params.id)
      .then((data) => res.json(data._id))
      .catch((err) => next(err));
  });


module.exports = router;