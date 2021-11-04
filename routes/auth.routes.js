const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// signup route
router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  // verify sent info username
  if (!username) {
    return res.status(400).json({ errorMessage: "Please input username" });
  }

  // password length
  if (password.length < 8) {
    return res.json({
      errorMessage: "Please use at least 8 characters for your password",
    });
  }

  // check if username is taken
  User.findOne({ username: username })
    .then((founduser) => {
      if (founduser) {
        return res.json({
          errorMessage: "This username has been taken, please try another",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
    
    // encrypt password
    const saltRounds = 10;
    return bcrypt.genSalt(saltRounds).then((salt) => {
      bcrypt
        .hash(password, salt)
        .then((hashedPassword) => {
          // create user
          return User.create({ username, password: hashedPassword });
        })
        .then((user) => {
          req.session.user = user;
          req.status(201).json(user);
        })
        .catch((error) => {
          return res.json({
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
      errorMessage: `${username ? "password" : "username"} not filled`,
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.json({
          errorMessage: "Username is incorrect, please try again",
        });
      }
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.json({
            errorMessage: "Password is incorrect, please try again",
          });
        }
        req.session.user = user;
        return res.json(user);
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
    res.json({ successMessage: "Logged out correctly" });
  });
});

// sessions
router.get("/loggedin", (req, res, next) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  }
  res.status(403).json({ errorMessage: "Problem with authentication" });
});

module.exports = router;
