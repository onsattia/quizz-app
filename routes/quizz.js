const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Quizz = require("../models/Quizz");

// @route GET quizz/
// @desc  Get all quizz
// @access Public

router.get("/", (req, res) => {
  Quizz.find()
    .then(quizz => res.json(quizz))
    .catch(err => res.status(404).json({ noQuizzFound: "No quizz found" }));
});

// @route GET quizz/:id
// @desc  Get quizz by id
// @access Public

router.get("/:id", (req, res) => {
  Quizz.findById(req.params.id)
    .then(quizz => res.json(quizz))
    .catch(err =>
      res.status(404).json({ noquizzfound: "No quizz found with this ID" })
    );
});

// @route POST quizz/
// @desc  Create quizz
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuizz = new Quizz({
      question: req.body.question,
      answers: req.body.answers,
      points: req.body.points
    });

    newQuizz.save().then(quizz => res.json(quizz));
  }
);

// @route PUT quizz/:id
// @desc  Update quizz
// @access Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quizz.findByIdAndUpdate({ _id: req.params.id }, req.body).then(quizz => {
      Quizz.findOne({ _id: req.params.id }).then(quizz => {
        res.send(quizz);
      });
    });
  }
);

// @route DELETE quizz/:id
// @desc  delete quizz
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quizz.findOneAndRemove({ _id: req.params.id }).then(() =>
      res.json({ success: true })
    );
  }
);

module.exports = router;
