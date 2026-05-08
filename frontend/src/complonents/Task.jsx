const Task = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <p className="text-gray-500 mt-2">Manage your daily tasks</p>
        </div>

        {/* Form */}
        <form className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Add new task..."
            required
            className="form-input flex-1"
          />

          <button type="submit" className="btn">
            Add
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
              <button className="btn">Edit</button>
              <button className="btn">Delete</button>
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
