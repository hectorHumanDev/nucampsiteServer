const express = require("express");
const User = require("../models/user");
const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

usersRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        const err = new Error(`User ${req.body.username} already exists`);
        err.status = 403;
        return next(err);
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password,
        })
          .then((user) => {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
            res.json({ status: "Registration Successful", user: user });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

usersRouter.post("/login", (req, res, next) => {
  if (!req.session.user) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.setHeader("WWW-Authenticate", "Basic");
      const err = new Error("You are not authenticated");
      err.status = 401;
      return next(err);
    }
    console.log(authHeader);

    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    console.log("line 42 auth", auth);

    const username = auth[0];
    const password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          const err = new Error(`User ${user} doesn't exist`);
          err.status = 401;
          return next(err);
        } else if (user.password !== password) {
          const err = new Error(`Your password is incorrect`);
          err.status = 401;
          return next(err);
        } else if (user.username === username && user.password === password) {
          req.session.user = "authenticated";
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("You are authenticated");
        }
      })
      .catch((err) => next(err));
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("You are already authenticated");
  }
});

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
