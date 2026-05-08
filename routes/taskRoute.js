import express from "express";
import {
  deleteTask,
  getAllTasks,
  getOneTask,
  newTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", newTask);

router.get("/", getAllTasks);

router.get("/:id", getOneTask);

router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
