import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {

  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);

  const loadProfile = async () => {
    try {
      const res = await API.get("/users/me");   // fetch both user info and tasks
      setUser({ username: res.data.username, email: res.data.email });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile. Make sure you are logged in.");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Profile</h2>

        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>

        <hr />

        <h4>Your Tasks</h4>

        {tasks.length === 0 ? (
          <p>No tasks created yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="card p-2 mb-2">
              <strong>{task.title}</strong> - {task.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;