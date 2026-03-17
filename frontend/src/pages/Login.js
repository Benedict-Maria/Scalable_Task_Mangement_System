import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const login = async () => {

    try {

      const res = await API.post("/auth/login", user);

      localStorage.setItem("token", res.data.access_token);

      alert("Login successful");

      navigate("/dashboard");

    } catch {

      alert("You need to sign in first");

      navigate("/signup");

    }

  };

  return (

    <div className="container mt-5">

      <h2>Login</h2>

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

      <button className="btn btn-primary" onClick={login}>
        Login
      </button>

    </div>

  );
}

export default Login;