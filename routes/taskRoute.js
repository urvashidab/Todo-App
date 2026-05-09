import express from "express";
import {
  deleteTask,
  getAllTasks,
  getOneTask,
  newTask,
  updateTask,
} from "../controllers/taskController.js";

import idValidation from "../middlewares/idValidation.js";

const router = express.Router();

router.post("/", newTask);

router.get("/", getAllTasks);

router.get("/:id", idValidation, getOneTask);

router.delete("/:id", idValidation, deleteTask);
router.put("/:id", idValidation, updateTask);

export default router;
