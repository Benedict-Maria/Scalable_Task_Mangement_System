import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">

      <div className="container">

        <Link className="navbar-brand" to="/">
          Task Manager
        </Link>

        <div>

          {/* If user NOT logged in */}

          {!token && (
            <>
              <Link className="btn btn-light me-2" to="/">
                Home
              </Link>

              <Link className="btn btn-light me-2" to="/login">
                Login
              </Link>

              <Link className="btn btn-success" to="/signup">
                Signup
              </Link>
            </>
          )}

          {/* If user logged in */}

          {token && (
            <>
              <Link className="btn btn-light me-2" to="/dashboard">
                Dashboard
              </Link>

              <Link className="btn btn-light me-2" to="/create-task">
                Create Task
              </Link>

              <Link className="btn btn-light me-2" to="/profile">
                Profile
              </Link>

              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>

  );
}

export default Navbar;