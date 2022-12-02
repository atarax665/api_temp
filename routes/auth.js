const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pitch = mongoose.model("Pitch");

router.post("/pitches", async (req, res) => {
  const { entrepreneur, pitchTitle, pitchIdea, askAmount, equity} = req.body;
  if (!entrepreneur || !pitchTitle || !pitchIdea || !askAmount || !equity || equity > 100)
  {
    return res.status(400).json();
  }
  try {
    let cnt = await Pitch.find().countDocuments();
    const pitch = new Pitch({
      id: cnt + 1,
      entrepreneur,
      pitchTitle,
      pitchIdea,
      askAmount,
      equity,
    });
    await pitch.save();
    res.status(201).json({ id: pitch.id });
  }
  catch (err) {
    console.log(err);
  }
});

router.get("/pitches", async (req, res) => {
  try {
    const pitches = await Pitch.find({}, { _id: 0, __v: 0 }).sort({ id: -1 });
    if(pitches.length === 0) {
      return res.status(200).json({});
    }
    res.status(200).json(pitches);
  }
  catch (err) {
    console.log(err);
  }
});

router.post("/pitches/:id/makeOffer", async (req, res) => {
  const { investor, amount, equity, comment } = req.body;
  if (!investor || !amount || !equity || !comment || equity > 100) {
    return res.status(400).json();
  }
  try {
    const pitch = await Pitch.findOne({ id: req.params.id });
    if (!pitch) {
      return res.status(404).json();
    }
    else
    {
    pitch.offers.push({
      id: pitch.offers.length + 1,
      investor,
      amount,
      equity,
      comment,
    });
    await pitch.save();
    res.status(201).json({ id: pitch.offers.length });
    }
  }
  catch (err) {
    console.log(err);
  }
});

router.get("/pitches/:id", async (req, res) => {
  try {
    const pitch = await Pitch.findOne({ id: req.params.id }, { _id: 0, __v: 0 });
    if (!pitch) {
      return res.status(404).json();
    }
    res.status(200).json(pitch);
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;
