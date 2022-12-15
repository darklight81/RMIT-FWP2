// Code from Week 8 Tutorial

const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes.
require("./src/routes/user.routes")(express, app);
require("./src/routes/post.routes")(express, app);
require("./src/routes/friendship.routes")(express, app);
require("./src/routes/comment.routes")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
