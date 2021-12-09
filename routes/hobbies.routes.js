const router = require("express").Router();
const Hobby = require("../models/Hobby.model");
const Post = require("../models/Post.model");
const { isLoggedIn, isAdmin } = require("../middlewares/authoritation");
// The hobbies will be created by admins

// create the main hobbies route (list)
router.get("/", (req, res, next) => {
  Hobby.find()
    .populate("posts")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

router.get("/random/:number", (req, res, next) => {
  Hobby.count()
    .then((numberOfHobbies) => {
      const randomNumber = Math.floor(Math.random() * numberOfHobbies);
      return Hobby.find(
        {},
        {},
        { skip: randomNumber, limit: req.params.number }
      );
    })
    .then((event) => res.json(event))
    .catch((err) => next(err));
});

// create the add hobbies route
router.post("/create", isAdmin, (req, res, next) => {
  const { name, typeOfActivity, description, placeOfActivity, image } =
    req.body;
  // console.log(req.body);
  // console.log("CREATE HOBBIES")
  Hobby.create({ name, typeOfActivity, description, placeOfActivity, image })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the detailed hobbies route
router.get("/:id", (req, res, next) => {
  Hobby.findById(req.params.id)
    .populate("posts")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the post for hobbies
router.post("/:id/posts/create", isLoggedIn, (req, res, next) => {
  const { image, description } = req.body;
  const { user } = req.session;
  Post.create({ image, description, user_id: user._id })
    .then((post) => {
      return Hobby.findByIdAndUpdate(
        req.params.id,
        { $push: { posts: post._id } },
        { new: true }
      ).populate("posts");
    })
    .then((hobby) => {
      return res.json({ hobby });
    })
    .catch((err) => {
      next(err);
    });
});

// create the edit hobbies route
// router.patch because patch will only update the specific/chosen hobby _> /:id
// (!) setting the change to "true" to confirm the done changes
router.patch("/:id", isAdmin, (req, res, next) => {
  const { name, typeOfActivity, description, placeOfActivity, image } =
    req.body;
  Hobby.findByIdAndUpdate(
    req.params.id,
    { name, typeOfActivity, description, placeOfActivity, image },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete hobbies route
// router.delete
// after deleting the hobby => redirect to hobby list ("/") ?
router.delete("/:id", isAdmin, (req, res, next) => {
  Hobby.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
});

module.exports = router;
