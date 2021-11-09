const router = require("express").Router();
const Event = require("../models/Event.model");
const Review = require("../models/Review.model");

// create the main events route (list)
router.get("/", (req, res, next) => {
  Event.find()
   .then((data) => res.json(data))
   .catch((err) => next(err));
});

router.get("/random/:number", (req, res, next) => {
  Event.count()
   .then((numberOfEvents) => {
      const randomNumber = Math.floor(Math.random() * numberOfEvents)
     return Event.find({}, {}, { skip: randomNumber, limit: req.params.number })
   })
   .then(event => res.json(event))
   .catch((err) => next(err));
});

// create the add events route
router.post("/create", (req, res, next) => {
  const {
    title,
    eventImage,
    hobby_id,
    description,
    equipment,
    date,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    // charity_id,
  } = req.body; 
  // console.log(req.body);
  // console.log("CREATE EVENTS");
  Event.create({
    title,
    eventImage,
    hobby_id,
    description,
    equipment,
    date,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    // charity_id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the detailed events route
router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the review for events
router.post("/:id/reviews/create", (req, res, next) => {
  const { comment, stars } = req.body;
  const { user } = req.session;
  Review.create({ comment, stars, user_id: user._id })
      .then((review) => {
        return Event.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } }, { new: true }).populate("reviews")
      })
      .then((charity) => {
        return res.json({ charity })
      })
      .catch((err) => {next(err)});  
  });

// creating an endpoint to show who's attending to the event
router.post("/:id/attend", (req, res, next) => {
    Event.findByIdAndUpdate(req.params.id, { $push: { attendees: req.session.user._id } }, { new: true })
    .then((result) => {
        res.status(200).json({event: result})
    }).catch((err) => {
        
    });
})

// create the edit events route
// router.patch because patch will only update the specific/chosen event _> /:id
// (!) setting the change to "true" to confirm the done changes
router.patch("/:id", (req, res, next) => {
    const {
        title,
        eventImage,
        hobby_id,
        description,
        equipment,
        date,
        attendees_max,
        attendees_min,
        pricePolicy,
        price,
        charity_id,
      } = req.body;
  Event.findByIdAndUpdate(
    req.params.id,
    {   title,
        eventImage,
        hobby_id,
        description,
        equipment,
        date,
        attendees_max,
        attendees_min,
        pricePolicy,
        price,
        charity_id 
      },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete event route
// router.delete
// after deleting the event => redirect to event list ("/") ?
router.delete("/:id", (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
});


// How we make the relation between the user that created the event and the event?

module.exports = router;
