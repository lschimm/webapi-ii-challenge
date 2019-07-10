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

// Trying to useing async/await && try/catch below
// router.post('/posts', async (req, res) => {
//   try {
//     const postItem = await Posts.insert(req.body);
//     res.status(201).json(postItem);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: 'There was an error while saving the post to the database'
//     });
//   }
// });

// DELETE
router.delete("/posts/:id", (req, res) => {
  DB.remove(req.params.id).then(deleted => {
    if (deleted && deleted > 0) {
      res.status(200).json({ message: "deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});

// PUT
// updates the a new title and content on existing id

router.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json(`{ error: "The post information could not be modified." }`);
  } else {
    DB.update(id, { title, contents })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res
          .status(500)
          .json(`{ error: "The post information could not be modified." }`);
      });
  }

  // DB.update(id, { title, contents }).then(post => {
  //   res.status(200).json(post);
  // })
  // .catch(error => {
  //   res.
  // })
});

module.exports = router;
