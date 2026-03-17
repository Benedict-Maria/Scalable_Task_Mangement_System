import { Link } from "react-router-dom";

function Home() {

  return (

    <div>

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark p-3">

        <div className="container">

          <Link className="navbar-brand" to="/">
            Task Manager
          </Link>

          <div>

            <Link className="btn btn-light me-2" to="/">
              Home
            </Link>

            <Link className="btn btn-light me-2" to="/signup">
              Sign In
            </Link>

            <Link className="btn btn-primary" to="/login">
              Login
            </Link>

          </div>

        </div>

      </nav>


      {/* Home Content */}

      <div className="container mt-5 text-center">

        <h1 className="mb-4">
          Task Management System
        </h1>

        <p className="lead">
          Manage your tasks efficiently and stay productive.
        </p>

        <hr className="my-5" />

        <h2>About Us</h2>

        <p>
          This Task Management System helps users organize their daily
          activities, track deadlines, and manage priorities efficiently.
        </p>

        <p>
          Built using modern full-stack technologies including
          React for frontend and FastAPI for backend.
        </p>

        <p>
          Users can create tasks, edit them, track progress,
          and maintain productivity with a simple dashboard.
        </p>

      </div>

    </div>

  );

}

export default Home;