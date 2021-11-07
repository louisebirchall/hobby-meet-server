const router = require("express").Router();
const Charity = require("../models/Event.model");

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

// create the edit charities route
// router.patch because patch will only update the specific/chosen event _> /:id

// create the delete charities route
// router.delete
// after deleting the charity => redirect to charities list ("/") ?


// 

module.exports = router;