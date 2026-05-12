import { useEffect, useState } from "react";
import Api from "../services/todoApi.js";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState("");
  const [editText, setEditText] = useState("");
  const [editID, setEditID] = useState(null);

  const handleChange = (e) => setNewTask(e.target.value);
  const handleEditText = (task) => {
    setEditID(task._id);
    setEditText(task.task);
  };

  const handleEditChange = (e) => setEditText(e.target.value);

  // fetch all tasks
  const getAllTasks = async () => {
    try {
      const response = await Api.get("/tasks");
      setTasks(response.data.tasks);
      // console.log(response.data.tasks);
    } catch (err) {
      console.log(err);
      setError("Failed to load tasks");
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  // add new task

  const addTask = async () => {
    if (!newTask.trim()) {
      return;
    }
    try {
      const response = await Api.post("/tasks", {
        task: newTask,
      });
      setTasks([...tasks, response.data.task]);
      setNewTask("");
    } catch (err) {
      console.log(err);
      setError("Failed to add task");
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await Api.delete(`/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task._id !== id);
      setTasks(filteredTasks);
    } catch (err) {
      console.log(err);
      setError("Failed to delete task");
    }
  };

  // update completed status.(toggle)
  const updateTask = async (id, completed) => {
    try {
      const response = await Api.put(`/tasks/${id}`, {
        completed: !completed,
      });
      const taskUpdated = tasks.map((task) => {
        return task._id === id ? response.data.updatedTask : task;
      });
      setTasks(taskUpdated);
    } catch (err) {
      console.log(err);
      setError("Failed to update task");
    }
  };

  // edit task text
  const saveEdit = async (id) => {
    if (!editText.trim()) {
      return;
    }
    try {
      const response = await Api.put(`/tasks/${id}`, {
        task: editText,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? response.data.updatedTask : task,
      );

      setTasks(updatedTasks);
      setEditID(null);
      setEditText("");
    } catch (err) {
      console.log(err);
      setError("Failed to edit text");
    }
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
        <form onSubmit={addTask} className="flex gap-4 mb-8">
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

        {/* if error occurs */}
        {error && (
          <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
        )}

        {/* task list */}
        <div className="flex flex-col gap-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-4">
              No tasks yet. Add some tasks
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => updateTask(task._id, task.completed)}
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  {/* if editing , then show input otherwise tast.  */}
                  {editID === task._id ? (
                    <input
                      type="text"
                      value={editText}
                      autoFocus
                      onChange={handleEditChange}
                      className="form-input flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEdit(task._id);
                        }
                      }}
                    />
                  ) : (
                    <p
                      className={`text-gray-800 transition-all ${task.completed ? "line-through" : ""}`}
                    >
                      {task.task}{" "}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {/* if we are doing editing then show save button otherwise  edit button */}
                  {editID === task._id ? (
                    <button
                      type="submit"
                      onClick={() => saveEdit(task._id)}
                      className="btn-save"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn-edit"
                      type="submit"
                      onClick={() => handleEditText(task)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn-delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
