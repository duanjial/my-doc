const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    return res.status(200).json({
      message: "Register successful",
    });
  })(req, res, next);
});

// Login
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(error);
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, name: user.name, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.status(200).send({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Logout
router.get("/logout", function (req, res) {
  req.logout();
  return res.status(200).send({ msg: "logout success" });
  // res.redirect('/');
});

module.exports = router;
