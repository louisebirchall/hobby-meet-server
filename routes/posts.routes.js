const router = require("express").Router();
const Post = require("../models/Post.model");
const fileUploader = require("../middlewares/cloudinary.config")


// the create reviews route is in each place that is having a review created

// create the detailed posts route
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

// create the edit posts route
router.patch("/:id", fileUploader.single("postImage"),(req, res, next) => {
    const{ description}= req.body;
    const postImage = req.file.path;
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