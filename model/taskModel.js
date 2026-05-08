import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
