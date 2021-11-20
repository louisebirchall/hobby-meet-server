const router = require("express").Router();

// const MongoStore = require("connect-mongo");

const Event = require("../models/Event.model");
const User = require("../models/User.model");
const Hobby = require("../models/Hobby.model");
const Charity = require("../models/Charity.model");

// creating a global search that filters through the listed models

router.get("/search", async (req, res, next) => {
  // type can be all, hobbies, events, users, charities
  const { search, type } = req.query;
  try {
    // queries
    const nameQuery = { name: { $regex: search, $options: 'gi' } }
    const titleQuery = { title: { $regex: search, $options: 'gi' } }
    const usernameQuery = { username: { $regex: search, $options: 'gi' } }

    let hobbies, events, users, charities;
    
    // getting the data
    if( type === 'hobbies' || type === 'all' ){
      hobbies = await Hobby.find(nameQuery);
    }
    if( type === 'events' || type === 'all'){
      events = await Event.find(titleQuery);
    }
    if( type === 'users' || type === 'all'){
      users = await User.find(usernameQuery);
    }
    if( type === 'charities' || type === 'all'){
      charities = await Charity.find(nameQuery);
    }

    // respond
    res.json({ hobbies, charities, events, users })
  } catch(err){
    next(err)
  }
});


module.exports = router;