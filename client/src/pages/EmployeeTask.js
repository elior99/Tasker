import React, { useEffect, useState } from "react";
import CookieController from "../components/controller/CookieController";
import Filter from "../components/Filter";
import CardContainer from "../components/CardContainer";
import Card from "../components/Card";

function EmployeeTask() {
  const [users, setUsers] = useState(null);
  const [taskUpdated, setTaskUpdated] = useState(0);
  const [loading, setLoading] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const getCookie = CookieController();



    const [allData, setAllData] = useState(null);
    const [filterUsers, setfilterUsers] = useState([]);
    var uniqueUsernames = [];
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");

 
/*
     const modalBackdrop = document.querySelector(".modal-backdrop.fade.show");

     if (modalBackdrop) {
       modalBackdrop.remove();
     }
   
*/

  const extractUniqueUsernames = (data) => {
    
    data.forEach((task) => {
      const manager = users.find((user) => user.id === task.from_manager);
      if (manager) {
        // Check if employee with the same id already exists in uniqueUsernames

        const existingEmployee = uniqueUsernames.find(
          (manager1) => manager1.id === manager.id
        );

        if (!existingEmployee) {


          uniqueUsernames.push(manager);
        }
      }
    });

    setfilterUsers(uniqueUsernames);
  };

  const filterData = () => {
    const filteredData = allData.filter((task) => {
      // Filter by selectedEmployeeId

      if (
        selectedEmployeeId !== "all" &&
        task.from_manager !== parseInt(selectedEmployeeId)
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
  };

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
  };

  
  useEffect(() => {
    if (allData !== null && users !== null) 
        uniqueUsernames = extractUniqueUsernames(allData);
    
  }, [users, allData]);


  useEffect(() => {
    // Make an HTTP request
    fetch(process.env.REACT_APP_BACKEND_URL+ "/tasks/employee/" + getCookie.id)
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

    fetch(process.env.REACT_APP_BACKEND_URL+"/users/managers")
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
        setLoading((load) => 0)
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
      <Filter
        filterUsers={filterUsers}
        filterData={filterData}
        handleUserSelect={handleEmployeeSelect}
        handlePrioritySelect={handlePrioritySelect}
        userType={"Manager"}
      />
      <div className="row">
        <CardContainer title={"Pending"}>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => {
              const manager = users.find(
                (user) => user.id === task.from_manager
              );
              const fromManager = manager ? manager.name : "";

              return (
                <Card
                  key={task._id}
                  taskData={task}
                  givenByTo={fromManager}
                  action="In Progress"
                  id={task._id}
                  loading={loading}
                  setLoading={setLoading}
                  handleTask={moveTask}
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
              const manager = users.find(
                (user) => user.id === task.from_manager
              );
              const fromManager = manager ? manager.name : "";

              return (
                <Card
                  key={task._id}
                  taskData={task}
                  givenByTo={fromManager}
                  action="Completed"
                  id={task._id}
                  loading={loading}
                  setLoading={setLoading}
                  handleTask={moveTask}
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
              const manager = users.find(
                (user) => user.id === task.from_manager
              );
              const fromManager = manager ? manager.name : "";

              return (
                <Card
                  key={task._id}
                  taskData={task}
                  givenByTo={fromManager}
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
