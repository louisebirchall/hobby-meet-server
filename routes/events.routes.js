const router = require("express").Router();
const Event = require("../models/Event.model");
const Review = require("../models/Review.model");
const Post = require("../models/Post.model");
const { isLoggedIn } = require("../middlewares/authoritation");

// create the main events route (list)
router.get("/", (req, res, next) => {
  Event.find()
    .populate("posts user_id reviews")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

router.get("/random/:number", (req, res, next) => {
  Event.count()
    .then((numberOfEvents) => {
      const randomNumber = Math.floor(Math.random() * numberOfEvents);
      return Event.find(
        {},
        {},
        { skip: randomNumber, limit: req.params.number }
      );
    })
    .then((event) => res.json(event))
    .catch((err) => next(err));
});

// create the add events route
router.post("/create", isLoggedIn, (req, res, next) => {
  const {
    image,
    title,
    description,
    equipment,
    date,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy,
    hobby_id,
  } = req.body;
  const { user } = req.session;
  // console.log(req.body);
  // console.log("CREATE EVENTS");
  Event.create({
    image,
    title,
    description,
    equipment,
    date,
    user_id: user._id,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy,
    hobby_id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the detailed events route
router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .populate("posts user_id reviews attendees")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the review for events
router.post("/:id/reviews/create", isLoggedIn, (req, res, next) => {
  const { comment, stars } = req.body;
  const { user } = req.session;
  Review.create({ comment, stars, user_id: user._id })
    .then((review) => {
      return Event.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: review._id } },
        { new: true }
      ).populate("reviews");
    })
    .then((event) => {
      return res.json({ event });
    })
    .catch((err) => {
      next(err);
    });
});

// create the post for events
router.post("/:id/posts/create", isLoggedIn, (req, res, next) => {
  const { description, image } = req.body;
  const { user } = req.session;
  Post.create({ image, description, user_id: user._id })
    .then((post) => {
      return Event.findByIdAndUpdate(
        req.params.id,
        { $push: { posts: post._id } },
        { new: true }
      ).populate("posts");
    })
    .then((event) => {
      return res.json({ event });
    })
    .catch((err) => {
      next(err);
    });
});

// creating an endpoint to show who's attending to the event
router.post("/:id/attend", (req, res, next) => {
  console.log(req.session);
  Event.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { attendees: req.session.user._id } },
    { new: true }
  )
    .populate("posts user_id reviews attendees")
    .then((result) => {
      console.log(result);
      res.status(200).json({ event: result });
    })
    .catch((err) => console.log(err));
});

// create the edit events route
// router.patch because patch will only update the specific/chosen event _> /:id
// (!) setting the change to "true" to confirm the done changes
router.patch("/:id", isLoggedIn, (req, res, next) => {
  const {
    image,
    title,
    description,
    equipment,
    date,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy,
    hobby_id,
  } = req.body;

  Event.findByIdAndUpdate(
    req.params.id,
    {
    image,
    title,
    description,
    equipment,
    date,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy,
    hobby_id,
    },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete event route
// router.delete
// after deleting the event => redirect to event list ("/") ?
router.delete("/:id", isLoggedIn, (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
});

// How we make the relation between the user that created the event and the event?

module.exports = router;
