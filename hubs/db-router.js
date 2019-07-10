const express = require("express");

const DB = require("../data/db");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const db = await DB.find(req.query);
    res.status(200).json(db);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "i have no clue" });
  }
});

module.exports = router;
