import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import CookieController from "../components/controller/CookieController";

function CreateNewTask(props) {

  const [startDate, setStartDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [selectedPriority, setSelectedPriority] = useState(0);
  const taskTitleRef = useRef();
  const taskDescRef = useRef();
  const navigate = useNavigate();
    const getCookie = CookieController();

  useEffect(() => {
    // Make an HTTP request
    fetch(process.env.REACT_APP_BACKEND_URL + "/users/employeesUnderManager/" + getCookie.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        // Data fetched successfully

        setEmployees(data);

        if (data.length > 0) {
          setSelectedEmployeeId(data[0].id);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();

    const taskTitle = taskTitleRef.current.value;
    const taskDesc = taskDescRef.current.value;

    const taskData = {
      title: taskTitle,
      description: taskDesc,
      from_manager: getCookie.id,
      to_employee: selectedEmployeeId,
      due_date: startDate.toString(),
      priority: selectedPriority,
    };

    fetch(process.env.REACT_APP_BACKEND_URL + "/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (response.ok) {
         
          Swal.fire("Task Created Successfully", "Click To Return To Home Page", "success").then((result) => {
             return navigate("/manager");
          });

          
        } else {
          throw new Error("Error sending task data");
        }
      })
      .catch((error) => {

                 
          Swal.fire("Something Went Wrong", "Click ok and try again", "error");

        console.error(error);
        // Handle the error appropriately
      });

  };

  const handleEmployeeSelect = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

    const handlePrioritySelect = (event) => {
      setSelectedPriority(event.target.value);

    };

  return (
    <div>
      <h2>Create New Task</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            ref={taskTitleRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <div className="form-floating">
            <textarea
              className="form-control"
              style={{ height: "100px" }}
              placeholder="Leave a comment here"
              id="floatingTextarea"
              ref={taskDescRef}
            ></textarea>
            <label htmlFor="floatingTextarea">Description</label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Task for employee:</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleEmployeeSelect}
          >
            {employees.map((employee) => (
              <option key={employee._id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Priority:</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handlePrioritySelect}
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Pick a due date
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateNewTask;
