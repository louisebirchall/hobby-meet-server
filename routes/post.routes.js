const router = require("express").Router();
const Post = require("../models/Post.model");


// create the add posts route
router.post("/create", (req, res, next) => {
    const {postImage, description} = req.body;
    Post.create({postImage, description})
        .then((data) => res.json(data))
        .catch((err) => {next(err)});
})

// create the detailed posts route
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

// create the edit posts route
router.patch("/:id", (req, res, next) => {
    const{postImage, description}= req.body;
  Post.findByIdAndUpdate(req.params.id, {postImage, description}, { new: true })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete posts route
// after deleting the post => redirect to the create post? (Not sure where will be better to redirect)
router.delete("/:id", (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
      .then((data) => res.json(data._id))
      .catch((err) => next(err));
  });


module.exports = router;