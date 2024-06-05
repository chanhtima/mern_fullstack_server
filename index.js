const express = require("express");
const app = express();
const port =  3000;
const connectDB = require('./config/db.js');
const { readdirSync } = require('fs');
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use("/api/images", express.static("images"));

// MongoDB connection
connectDB()


// Routes
readdirSync("./routers").map((r) => app.use("/api", require("./routers/" + r)));


// Root route
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is Running on port: http://localhost:${port}`);
  });