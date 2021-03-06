const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { isLoggedIn } = require("../middlewares/authoritation");

// signup route
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  // verify sent info
  if (!username || !email || !password) {
    return res.status(400).json({
      errorMessage:
        "Hey! You need to enter your username, email and password for sign up!",
    });
  }

  // email BE validation
  const mailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!mailRegex.test(email)) {
    return res.status(400).json({
      errorMessage:
        "Woohoo! that seems to be an incorrect type of email. Please, write a correct one!",
    });
  }

  // password length
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      errorMessage:
        "Oooo your password needs to be, at least, 8 characters long, uppercase and lowercase, if you want to get in!",
    });
  }

  // check if username is taken
  User.findOne({ username: username }).then((founduser) => {
    if (founduser) {
      return res.status(400).json({
        errorMessage:
          "Hi fellow! This username has already been taken. We are sure you'll find another one that fits you!",
      });
    }
    // encrypt password
    const saltRounds = 10;
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // create user
        return User.create({ username, password: hashedPassword, email });
      })
      .then((user) => {
        req.session.user = user;
        res.status(201).json(user);
      })
      .catch((error) => {
        return res.status(400).json({
          errorMessage: `Problem creating user, ${error.message}`,
        });
      });
  });
});

// login
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      errorMessage: `Maybe did you forget to enter your ${
        username ? "password" : "username"}?`,
        // username ? "password" : password ? "username and password" : "username"}`,
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          errorMessage:
            "Do you have an account yet? Make sure you write you username correctly :-D!",
        });
      }
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({
            errorMessage: "Password is incorrect, please try again",
          });
        }
        req.session.user = user;
        return res.json({ user });
      });
    })
    .catch((err) => {
      next(err);
    });
});

// logout
router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return res
        .status(500)
        .json({ errorMessage: `Problem with logout ${error.message}` });
    }
    res.json({
      successMessage: "We'll miss you! We hope you'll come back soon!",
    });
  });
});

// sessions
router.get("/loggedin", (req, res, next) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  }
  res.status(403).json({
    errorMessage: "There was a problem with authentication. Please, try again!",
  });
});

//profiles (list to search)
router.get("/profiles", (req, res, next) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

//detailed profile (=> private)
router.get("/profiles/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

//edit profile
router.patch("/profiles/:id", (req, res, next) => {
  console.log("something");
  const { username, email, fullName, image, sex, age, hobbies, type, isAdmin } =
    req.body;
  User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
      fullName,
      image,
      sex,
      age,
      hobbies,
      type,
      isAdmin,
    },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//delete profile
router.delete("/profiles/:id", isLoggedIn, (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data._id))
    .catch((err) => next(err));
});

module.exports = router;
