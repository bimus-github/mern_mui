require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notes");

// express app
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/notes", noteRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
