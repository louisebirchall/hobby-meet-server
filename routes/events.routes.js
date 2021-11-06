const router = require("express").Router();
const Event = require("../models/Event.model");

// create the main events route (list)

router.get("/", (req, res, next) => {
  //   Event.find({}, { eventImage: 1, title: 1, hobby_id: 1, date: 1 })

  Event.find()
    .then((data) => res.json(data))
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
    charity_id,
  } = req.body; 
  // console.log(req.body);
  console.log("CREATE EVENTS");
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
    charity_id,
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

// creating an endpoint 
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
        owner_id,
        attendees,
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
        owner_id,
        attendees,
        attendees_max,
        attendees_min,
        pricePolicy,
        price,
        charity_id },
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

module.exports = router;
