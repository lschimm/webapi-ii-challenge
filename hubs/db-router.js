const express = require("express");

const DB = require("../data/db.js");

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

// create a post using the info sent inside the `request body`

// POST yesterday's way...?
router.post("/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json(
        `{ errorMessage: "Please provide title and contents for the post." }`
      );
  }
});

// Trying to use Middleware (async and await) below
// router.post("/api/posts" (req, res) => {

// });

module.exports = router;
