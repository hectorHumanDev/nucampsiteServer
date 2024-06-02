const express = require("express");
const User = require("../models/user");
const usersRouter = express.Router();
const passport = require("passport");
const authenticate = require("../authenticate");

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

usersRouter.post("/signup", async (req, res) => {
  try {
    const user = new User({ username: req.body.username });
    await User.register(user, req.body.password);

    try {
      await user.save();
      passport.authenticate("local")(req, res, () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: true, status: "Registration Successful!" });
      });
    } catch (saveErr) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: saveErr });
    }
  } catch (registerErr) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ err: registerErr });
  }
});

usersRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: token,
      status: "You are successfully logged in!",
    });
  }
);

usersRouter.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/login");
  } else {
    const err = new Error("You are not logged in");
    next(err);
  }
});

module.exports = usersRouter;
