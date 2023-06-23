const router = require("express").Router();
const axios = require("axios");
let Tasks = require("../models/tasks.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.route("/add").post((req, res) => {

  const title = req.body.title;
  const description = req.body.description;
  const fromManager = Number(req.body.from_manager);
  const toEmployee = Number(req.body.to_employee);
  const status = 0;
  const dueDate = Date.parse(req.body.due_date);
  const priority = req.body.priority;

  const newTaks = new Tasks({
    name: title,
    description: description,
    from_manager: fromManager,
    to_employee: toEmployee,
    status: status,
    due_date: dueDate,
    priority: priority
  });

  newTaks
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/employee/:id").get((req, res) => {
  Tasks.find({ to_employee: req.params.id })
    .then((tasks) => {
       res.json(tasks);
    })
    .catch((err) => {
      res.status(400).json("Error fetching tasks: " + err);
    });
});


router.route("/manager/:id").get((req, res) => {
  Tasks.find({ from_manager: req.params.id })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(400).json("Error fetching tasks: " + err);
    });
});


router.route("/delete/:id").get((req, res) => {
  Tasks.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/update/:id").get((req, res) => {

  const filter = { _id: new ObjectId(req.params.id) };
  const update = { $inc: { status: 1 } };
  const options = { new: true };

  Tasks.findOneAndUpdate(filter, update, options)
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json("Task not found");
      }

      res.json("Task updated!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
