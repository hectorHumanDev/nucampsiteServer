const express = require("express");
const promotionRouter = express.Router();
const Promotion = require("../models/promotion");
const authenticate = require("../authenticate");
const cors = require("./cors");

promotionRouter
  .route("/")

  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.find()
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.create(req.body)
        .then((promotion) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        })
        .catch((err) => next(err));
    }
  )
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT operation not supported on /promotions/${req.params.promotionId}`
    );
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.deleteMany()
        .then((promotions) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotions);
        })
        .catch((err) => next(err));
    }
  );

promotionRouter
  .route("/:promotionId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation not support on campsites/${req.params.promotionId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      { $set: req.body },
      { new: true }
    )
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.findByIdAndDelete(req.params.promotionId)
        .then((promotion) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        })
        .catch((err) => next(err));
    }
  );

module.exports = promotionRouter;
