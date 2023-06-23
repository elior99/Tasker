import React, { useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login(props) {
  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // alert('A name was submitted: ' + this.state.value);
    e.preventDefault();

    const usernameForm = username.current.value;
    const passwordForm = password.current.value;

    const loginData = {
      username: usernameForm,
      password: passwordForm,
    };

    fetch(process.env.REACT_APP_BACKEND_URL+"/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.length !== 0) {
          Cookies.set(
            "cred",
            JSON.stringify({
              name: data[0].name,
              username: data[0].username,
              password: data[0].password,
              id: data[0].id,
              group: data[0].group,
            }),
            { expires: 7 }
          ); // Expires in 7 days

          Swal.fire(
            "You Logged in Successfully",
            "Click To Go To Home Page",
            "success"
          ).then((result) => {
            /*
            if (data[0].group == 1) return navigate("/employee");
            else
              return navigate("/manager");
              */
            return navigate("/");
          });
        } else {
          throw new Error("Error with data");
        }
      })
      .catch((error) => {
        Swal.fire("Something Went Wrong", "Click ok and try again", "error");

        console.error(error);
        // Handle the error appropriately
      });
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>
                  <label className="form-label" htmlFor="typeusernameX">
                    Username
                  </label>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="username"
                      id="typeusernameX"
                      className="form-control form-control-lg"
                      ref={username}
                    />
                  </div>
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      ref={password}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
