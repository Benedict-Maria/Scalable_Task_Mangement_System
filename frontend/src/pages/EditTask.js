import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
  });

  
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  
  const loadTask = useCallback(async () => {
    try {
      const res = await API.get("/tasks"); 
      const current = res.data.find((t) => t.id === parseInt(id));
      if (current) {
        setTask({
          title: current.title,
          description: current.description,
          priority: current.priority,
          due_date: current.due_date,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  
  const updateTask = async () => {
    try {
      await API.put(`/tasks/${id}`, task);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update task. Please check your inputs.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Edit Task</h2>

        <input
          className="form-control mb-2"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="priority"
          placeholder="Priority"
          value={task.priority}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
        />

        <button className="btn btn-success" onClick={updateTask}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditTask;