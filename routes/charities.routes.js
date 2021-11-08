const router = require("express").Router();
const Charity = require("../models/Event.model");

// The Charities will be created by admins

// create the main charities route (list)
router.get("/", (req, res, next) => {
    Charity.find()
     .then((data) => res.json(data))
     .catch((err) => next(err));
  });

// create the add charities route
router.post("/create", (req, res, next) => {
    const {charityImage, name, description} = req.body;
    Charity.create({charityImage, name, description})
    .then((data) => res.json(data))
    .catch((err) => {next(err)});
})

// create the detailed charities route
router.get("/:id", (req, res, next) => {
    Charity.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

// create the edit charities route
// router.patch because patch will only update the specific/chosen event _> /:id
router.patch("/:id", (req, res, next) => {
    const {
        charityImage,
        name,
        description,
      } = req.body;
  Charity.findByIdAndUpdate(
    req.params.id,
    {   charityImage,
        name,
        description },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete charities route
// router.delete
// after deleting the charity => redirect to charities list ("/") ?
router.delete("/:id", (req, res, next) => {
    Charity.findByIdAndDelete(req.params.id)
      .then((data) => res.json(data._id))
      .catch((err) => next(err));
  });

module.exports = router;