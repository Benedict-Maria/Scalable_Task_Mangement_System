import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const signup = async () => {

    try {

      await API.post("/auth/signup", user);

      alert("Signup successful. Please login.");

      navigate("/login");

    } catch {

      alert("Signup failed");

    }

  };

  return (

    <div className="container mt-5">

      <h2>Sign Up</h2>

      <input
        className="form-control mb-2"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        className="form-control mb-2"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={signup}>
        Sign Up
      </button>

    </div>

  );
}

export default Signup;