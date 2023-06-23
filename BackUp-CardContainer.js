import React, { useEffect, useState } from "react";
import Card from "../components/Card";

function CardContainer() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [taskUpdated, setTaskUpdated] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Make an HTTP request
    fetch("http://localhost:5000/tasks/employee/2")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        // Data fetched successfully

        setPendingTasks(data.filter((task) => task.status === 0));
        setInProgressTasks(data.filter((task) => task.status === 1));
        setCompletedTasks(data.filter((task) => task.status === 2));
      })
      .catch((error) => {
        // Error occurred during the request
        setError(error.message);
      });

    fetch("http://localhost:5000/users/managers")
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
        setError(error.message);
      });
  }, [taskUpdated]);


    if (users === null || pendingTasks === null) {
      return <div>Loading...</div>;
    }

  const moveTask = (id) => {


      fetch("http://localhost:5000/tasks/update/"+id)
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
          setError(error.message);
        });


  



  };

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card-box">
          <h4 className="text-dark">Pending</h4>
          <p className="text-muted">
            Your awesome text goes here. Your awesome text goes here.
          </p>
          {pendingTasks.map((task) => {
            const manager = users.find((user) => user.id === task.from_manager);
            const fromManager = manager ? manager.name : "";

            return (
              <Card
                key={task._id}
                taskData={task}
                fromManager={fromManager}
                action="In Progress"
                id={task.id}
                handleTask={moveTask}
              />
            );
          })}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card-box">
          <h4 className="text-dark">In Progress</h4>
          <p className="text-muted">
            Your awesome text goes here. Your awesome text goes here.
          </p>
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
                  fromManager={fromManager}
                  action="Done"
                  id={task.id}
                  handleTask={moveTask}
                />
              );
            })
          ) : (
            <p>No tasks in progress.</p>
          )}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card-box">
          <h4 className="text-dark">Completed</h4>
          <p className="text-muted">
            Your awesome text goes here. Your awesome text goes here.
          </p>
          {completedTasks.map((task) => {
            const manager = users.find((user) => user.id === task.from_manager);
            const fromManager = manager ? manager.name : "";

            return (
              <Card
                key={task._id}
                taskData={task}
                fromManager={fromManager}
                action={0}
                id={task.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardContainer;
