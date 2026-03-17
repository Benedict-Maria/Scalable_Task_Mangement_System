import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function CreateTask() {

  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value});
  };

  const createTask = async () => {

    await API.post("/tasks/", task);
    navigate("/dashboard");

  };

  return (
    <div>

      <Navbar />

      <div className="container mt-4">

        <h2>Create Task</h2>

        <input
          className="form-control mb-2"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="priority"
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="form-control mb-2"
          name="due_date"
          onChange={handleChange}
        />

        <button className="btn btn-primary" onClick={createTask}>
          Create
        </button>

      </div>

    </div>
  );
}

export default CreateTask;