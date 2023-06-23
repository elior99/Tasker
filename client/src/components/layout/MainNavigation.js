import { Link } from "react-router-dom";


function MainNavigation() {




  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Tasker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-link active" aria-current="page">
              Home
            </Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>

  );
}

export default MainNavigation;
