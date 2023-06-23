const router = require("express").Router();
let User = require("../models/user.model");
const session = require("express-session");
const cookieParser = require("cookie-parser");



router.route("/managers").get((req, res) => {
  User.find({group: 2}).select("name id")
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/employees").get((req, res) => {
  User.find({ group: 1 })
    .select("name id")
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/employeesUnderManager/:id").get((req, res) => {
  User.find({ manager_id: { $in: [req.params.id] } })
    .select("name id")
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {

  User.find({ username: req.body.username, password: req.body.password })
    .select("username password id group name")
    .then((users) => {
      
      res.json(users)

    })
    .catch((err) => res.status(400).json("Error: " + err));
    
});

module.exports = router;
