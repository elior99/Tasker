import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import Filter from "../components/Filter";
import Card from "../components/Card";
import CookieController from "../components/controller/CookieController";

function EmployeeTask() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(0);
  const [taskUpdated, setTaskUpdated] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const getCookie = CookieController();
  const [allData, setAllData] = useState(null);
  const [filterUsers, setfilterUsers] = useState([]);
  var uniqueUsernames = [];
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const extractUniqueUsernames = (data) => {

   data.forEach((task) => {
     const employee1 = users.find((user) => user.id === task.to_employee);
     if (employee1) {

       // Check if employee with the same id already exists in uniqueUsernames

       const existingEmployee = uniqueUsernames.find(
         (employee) => employee.id === employee1.id
       );

       if (!existingEmployee) {

         uniqueUsernames.push(employee1);
       }
     }
   });

   setfilterUsers(uniqueUsernames);
};

const filterData = () => {


  const filteredData = allData.filter((task) => {

    if (
      selectedEmployeeId !== "all" &&
      task.to_employee !== parseInt(selectedEmployeeId)
    ) {


      return false;
    }


    // Filter by selectedPriority
    if (
      selectedPriority !== "all" &&
      task.priority !== parseInt(selectedPriority)
    ) {
      
      return false;
    }


    return true;
  });

  setTaskTypes(filteredData);
}

  const handleEmployeeSelect = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  const handlePrioritySelect = (event) => {
    setSelectedPriority(event.target.value);
  };

  const setTaskTypes = (data) => {

            setPendingTasks(data.filter((task) => task.status === 0));
            setInProgressTasks(data.filter((task) => task.status === 1));
            setCompletedTasks(data.filter((task) => task.status === 2));
  }

  useEffect(() => {
    // Make an HTTP request
    console.log(process.env.REACT_APP_BACKEND_URL);
    fetch(process.env.REACT_APP_BACKEND_URL + "/tasks/manager/" + getCookie.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        // Data fetched successfully

        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.due_date);
          const dateB = new Date(b.due_date);
          return dateA - dateB; // Sort in ascending order
        });

        setAllData(sortedData);
        setTaskTypes(sortedData);
      })
      .catch((error) => {
        // Error occurred during the request
        console.log(error.message);
      });

    fetch(process.env.REACT_APP_BACKEND_URL+"/users/employees")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching additional data");
        }
      })
      .then((users) => {
        // Additional data fetched successfully
        setUsers(users);

      })
      .catch((error) => {
        // Error occurred during the request
         console.log(error.message);
      });
  }, [taskUpdated]);


  useEffect(() => {

    if(allData !== null && users !== null) {

      uniqueUsernames = extractUniqueUsernames(allData);

    }

   

  }, [users, allData]);


  if (users === null || pendingTasks === null) {
    return <div>Loading...</div>;
  }

  const moveTask = (id) => {
    fetch(process.env.REACT_APP_BACKEND_URL+"/tasks/update/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching additional data");
        }
      })
      .then((users) => {
        setTaskUpdated((newTask) => newTask + 1);
      })
      .catch((error) => {
        // Error occurred during the request
         console.log(error.message);
      });
  };

    const deleteTask = (id) => {
      fetch(process.env.REACT_APP_BACKEND_URL+"/tasks/delete/" + id)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error fetching additional data");
          }
        })
        .then((users) => {
          setTaskUpdated((newTask) => newTask + 1);
        })
        .catch((error) => {
          // Error occurred during the request
           console.log(error.message);
        });
    };



  return (
    <div>
      <h4>Hello, {getCookie.name}</h4>
      <hr />
      <div className="d-grid gap-2 col-6 mx-auto mb-4">
        <Link
          to="/createNewTask"
          className="btn btn-outline-success"
          type="button"
        >
          Create New Task
        </Link>
      </div>
      <Filter
        filterUsers={filterUsers}
        filterData={filterData}
        handleUserSelect={handleEmployeeSelect}
        handlePrioritySelect={handlePrioritySelect}
        userType={"Employee"}
      />

      <div className="row">
        <CardContainer title={"Pending"}>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => {
              const employee = users.find(
                (user) => user.id === task.to_employee
              );
              const toEmployee = employee ? employee.name : "";

              return (
                <Card
                  key={task._id}
                  taskData={task}
                  givenByTo={toEmployee}
                  action={"Delete"}
                  id={task._id}
                  handleTask={moveTask}
                  deleteTask={deleteTask}
                  setLoading={setLoading}
                  loading={loading}
                />
              );
            })
          ) : (
            <p>No pending tasks</p>
          )}
        </CardContainer>

        <CardContainer title={"In Progress"}>
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) => {
              const employee = users.find(
                (user) => user.id === task.to_employee
              );
              const toEmployee = employee ? employee.name : "";
              return (
                <Card
                  key={task._id}
                  taskData={task}
                  givenByTo={toEmployee}
                  action={0}
                  id={task._id}
                  handleTask={moveTask}
                  setLoading={setLoading}
                />
              );
            })
          ) : (
            <p>No tasks in progress.</p>
          )}
        </CardContainer>

        <CardContainer title={"Completed"}>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => {
              const employee = users.find(
                (user) => user.id === task.to_employee
              );
              const toEmployee = employee ? employee.name : "";

              return (
                <Card
                  key={task._id}
                  taskData={task}
                  givenByTo={toEmployee}
                  action={0}
                  id={task._id}
                />
              );
            })
          ) : (
            <p>No completed tasks.</p>
          )}
        </CardContainer>
      </div>
    </div>
  );
}

export default EmployeeTask;
