import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {

    try {

      const res = await API.get("/tasks");

      const sorted = res.data.sort(
        (a, b) => a.status === "completed" ? 1 : -1
      );

      setTasks(sorted);

    } catch (error) {

      console.log("Error loading tasks:", error);

    }

  };

  const completeTask = async (id) => {

    try {

      await API.put(`/tasks/${id}/complete`);

      loadTasks();

    } catch (error) {

      console.log("Error completing task:", error);

    }

  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      loadTasks();

    } catch (error) {

      console.log("Error deleting task:", error);

    }

  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (

    <div>

      <Navbar />

      <div className="container mt-4">

        <h2>Dashboard</h2>

        {tasks.length === 0 ? (

          <p>No tasks created yet.</p>

        ) : (

          tasks.map((task) => (

            <div
              key={task.id}
              className="card p-3 mb-3"
              style={{ opacity: task.status === "completed" ? 0.5 : 1 }}
            >

              <h5>{task.title}</h5>

              <p>{task.description}</p>

              <p>Status: {task.status}</p>

              <button
                className="btn btn-success btn-sm me-2"
                disabled={task.status === "completed"}
                onClick={() => completeTask(task.id)}
              >
                Completed
              </button>

              <Link
                className="btn btn-warning btn-sm me-2"
                style={{ fontSize: "12px" }}
                to={`/edit-task/${task.id}`}
              >
                Edit
              </Link>

              <button
                className="btn btn-danger btn-sm"
                style={{ fontSize: "12px" }}
                disabled={task.status === "completed"}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Dashboard;