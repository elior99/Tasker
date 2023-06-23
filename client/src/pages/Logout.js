
import React, { useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  Swal.fire({
    title: "Want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("You logged out!", "", "success").then((result) => {
        Cookies.remove("cred"); // Remove the 'cred' cookie
        return navigate("/login");
      });
        
    }
    else {
        navigate(-1);
    }
  });


}

export default Logout;