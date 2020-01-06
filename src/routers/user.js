const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/users", (req, res) => {
  User.getAllUsers()
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
});

router.post("/register", (req, res) => {
  const { userName, email, password } = req.body;
  User.createUser(userName, email, password)
    .then(user => {
      res.status(200).json({ user, msg: "Account created successfully" });
    })
    .catch(err => console.log(err));
});

module.exports = router;
