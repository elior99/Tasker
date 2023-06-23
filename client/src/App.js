import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import EmployeeTask from "./pages/EmployeeTask";
import ManageTask from "./pages/ManageTask";
import CreateNewTask from "./pages/CreateNewTask";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Layout from "./components/layout/Layout";
import CookieController from "./components/controller/CookieController";

function App() {

   const navigate = useNavigate();

   var userCookieGroup = CookieController();



     useEffect(() => {


       if (
         !userCookieGroup ||
         (userCookieGroup.group !== 1 && userCookieGroup.group !== 2)
       ) {
         navigate("/login");
       }
     }, [navigate, userCookieGroup]);

     
   if (userCookieGroup.group === 1) {
     return (
       <Layout>
         <Routes>
           <Route path="/" element={<EmployeeTask />} exact />
           <Route path="/createNewTask" element={<CreateNewTask />} exact />
           <Route path="/logout" element={<Logout />} exact />
           <Route path="*" element={<Navigate to="/" />} />
         </Routes>
       </Layout>
     );
   } else if (userCookieGroup.group === 2) {
     return (
       <Layout>
         <Routes>
           <Route path="/" element={<ManageTask />} />
           <Route path="/createNewTask" element={<CreateNewTask />} exact />
           <Route path="/logout" element={<Logout />} exact />
           <Route path="*" element={<Navigate to="/" />} />
         </Routes>
       </Layout>
     );
   } else {
     return (
       <Routes>
         <Route path="/login" element={<Login />} exact />
       </Routes>
     );
   }
}

export default App;
