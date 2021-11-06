const router = require("express").Router();
const Hobby = require("../models/Hobby.model");

// create the main hobbies route (list)

router.get("/", (req, res, next) => {
//   Hobby.find({}, { hobbyImage: 1, name: 1, typeOfActivity: 1 })
  
Hobby.find()
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the add hobbies route

router.post("/create", (req, res, next) => {
  const { name, typeOfActivity, description, hobbyImage, placeOfActivity } = req.body;
  // console.log(req.body);
  console.log("CREATE HOBBIES")
  Hobby.create({
    name,
    typeOfActivity,
    description,
    hobbyImage,
    placeOfActivity,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the detailed hobbies route

router.get("/:id", (req, res, next) => {
    Hobby.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
})

// create the edit hobbies route
// router.patch because patch will only update the specific/chosen hobby _> /:id 
// (!) setting the change to "true" to confirm the done changes

router.patch("/:id", (req, res, next) => {
    const { name, typeOfActivity, description, hobbyImage, placeOfActivity } = req.body;
    Hobby.findByIdAndUpdate(
        req.params.id,
        { name, typeOfActivity, description, hobbyImage, placeOfActivity },
        { new: true }
    )
    .then((data) => res.json(data))
    .catch((err) => next(err));
})

// create the delete hobbies route
// router.delete
// after deleting the hobby => redirect to hobby list ("/") ?

router.delete("/:id", (req, res, next) => {
    Hobby.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
})

module.exports = router;
