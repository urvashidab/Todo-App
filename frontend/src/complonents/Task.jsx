import { useState } from "react";
import Api from "../services/todoApi.js";
import { Trash2, CheckCircle, Circle, Plus } from "lucide-react";

const Task = () => {
  const [newTask, setNewTask] = useState([]);
  const handleChange = (e) => setNewTask(e.target.value);

  // fetch all tasks
  const getAllTasks = async () => {
    try {
      const response = await Api.get();
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl text-gray-700 font-semibold uppercase">
            Task manager
          </h1>
          <p className="text-gray-400 mt-2">Manage your daily tasks</p>
        </div>

        {/* form */}
        <form className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={handleChange}
            placeholder="Add new task..."
            required
            autoFocus
            className="form-input flex-1"
          />

          <button type="submit" className="btn">
            Add task
          </button>
        </form>

        {/* Task List */}
        <div className="flex flex-col gap-4">
          {/* Single Task */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 cursor-pointer" />

              <p className="text-gray-800">Learn Node.js</p>
            </div>

            <div className="flex gap-2">
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>

          {/* Single Task */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 cursor-pointer" />

              <p className="line-through text-gray-400">Build Todo App</p>
            </div>

            <div className="flex gap-2">
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
