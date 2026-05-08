import mongoose from "mongoose";
import Task from "../model/taskModel.js";

// new task
export const newTask = async (req, res) => {
  try {
    const { task } = req.body;

    // empty filed
    if (!task) {
      return res.status(400).json({
        message: "Field can not be empty",
      });
    }
    // success
    const newTask = await Task.create({ task });
    return res.status(201).json({
      success: true,
      message: "New task has been created",
      newTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while creating new task",
      error: err.message,
    });
  }
};

// get all the tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }

    // success
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching all the tasks",
      error: err.message,
    });
  }
};

// get one task by id
export const getOneTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const oneTask = await Task.findById(req.params.id);
    if (!oneTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // success
    return res.status(200).json({
      success: true,
      oneTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while getting a task",
      error: err.message,
    });
  }
};

// delete task

export const deleteTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    // success
    return res.status(200).json({
      success: true,
      message: "Task has been deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting the task",
      error: err.message,
    });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        completed: req.body.completed,
      },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    // success
    return res.status(200).json({
      success: true,
      message: "Task has been updated",
      updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while updating the task",
      error: err.message,
    });
  }
};
