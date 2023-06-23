const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tasksSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    from_manager: { type: Number, required: true },
    to_employee: { type: Number, required: true },
    status: { type: Number, required: true },
    due_date: { type: Date, required: true },
    priority: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
