const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const path = require("path");
const { request } = require("http");

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/restaurantDB");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  peopleRequired: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/", (req, res) => {
  console.log(req.body);

  User.create({
    name: req.body.full_name,
    email: req.body.email_address,
    peopleRequired: req.body.total_person,
    message: req.body.message,
    date: req.body.booking_date,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
