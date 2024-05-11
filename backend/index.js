const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data");
const { randomizer } = require("./services");
const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a route for the API endpoint
app.get("/motions-detected", (req, res) => {
  // Send the response
  res.json(data);
});

app.get("/latest-motion-detected", (req, res) => {
  res.json(data?.[data?.length - 1]);
});
randomizer();
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
