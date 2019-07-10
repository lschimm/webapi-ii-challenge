const express = require("express");

const dbRouter = require("./hubs/db-router.js");

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h2>Trying this out.</h2>
  `);
});

server.use("/api/db-router", dbRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
