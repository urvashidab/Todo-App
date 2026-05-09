import mongoose from "mongoose";
import Task from "../model/taskModel.js";

// new task
export const newTask = async (req, res, next) => {
  try {
    const { task } = req.body;

    // empty filed
    if (!task) {
      const error = new Error("Field can not be empty");
      error.statusCode = 400;

      return next(error);
    }
    // success
    const createdTask = await Task.create({ task });
    return res.status(201).json({
      success: true,
      message: "New task has been created",
      createdTask,
    });
  } catch (err) {
    next(err);
  }
};

// get all the tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      const error = new Error("Tasks not found");
      error.statusCode = 404;
      return next(error);
    }

    // success
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

// get one task by id
export const getOneTask = async (req, res, next) => {
  try {
    const oneTask = await Task.findById(req.params.id);
    if (!oneTask) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    // success
    return res.status(200).json({
      success: true,
      oneTask,
    });
  } catch (err) {
    next(err);
  }
};

// delete task

export const deleteTask = async (req, res, next) => {
  try {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   const error = new Error("Invalid ID Format");
    //   error.statusCode = 400;
    //   return next(error);
    // }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }
    // success
    return res.status(200).json({
      success: true,
      message: "Task has been deleted",
    });
  } catch (err) {
    next(err);
  }
};

// update task
export const updateTask = async (req, res, next) => {
  try {
    const { task, completed } = req.body;

    // for empty field
    if (task !== undefined && task.trim() === "") {
      const error = new Error("Task field can not be empty");
      error.statusCode = 400;
      return next(error);
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        task,
        completed,
      },
      { new: true, runValidators: true },
    );
    if (!updatedTask) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }
    // success
    return res.status(200).json({
      success: true,
      message: "Task has been updated",
      updatedTask,
    });
  } catch (err) {
    next(err);
  }
};
