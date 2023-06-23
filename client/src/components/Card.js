import React from "react";
import Modal from "../pages/Modal";
import CookieController from "./controller/CookieController";
import Swal from "sweetalert2";

function Card(props) {

  const tasksList = props.taskData;

  const date = new Date(tasksList.due_date);

  const formattedDate = date.toLocaleDateString("en-GB");

  var userGroup = 0;

  const getCookie = CookieController();
  if (getCookie !== 0) userGroup = getCookie.group;

  const taskHandler = (e) => {
    e.stopPropagation();


        areYouSure("Move Task To " + props.action + "?","Are you sure you want to move this task?").then(
          (result) => {
            if (result.isConfirmed) {
              props.setLoading(props.id);
              props.handleTask(props.id);
              Swal.fire("Task Moved!", "", "success");
            }
          }
        );



  };


  const areYouSure = (title,text) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
  };


  const deleteTaskHandler = (e) => {
    e.stopPropagation();

    areYouSure("Delete task?","Are you sure you want to delete this task?").then((result) => {
      if (result.isConfirmed) {
        props.setLoading(props.id);
        props.deleteTask(props.id);
        Swal.fire("Task Deleted!", "", "success");
      }
    });

   
  };

  const showModal = () => {
    window.$("#" + tasksList._id).modal("show");
  };


  return (
    <div>
      <Modal modalData={tasksList} givenByTo={props.givenByTo} />
      <ul className="taskList list-unstyled" onClick={showModal}>
        <li>
          <p className="dueDate">
            <svg
              style={{ margin: "0px 0px 5px 10px" }}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
            </svg>{" "}
            Due date: {formattedDate}{" "}
          </p>
          <div style={{ padding: "10px" }}>
            {tasksList.name}

            <div className="mt-3">
              <p className="float-end mb-0 mt-2">
                {userGroup === 2 && props.action !== 0 ? (
                  <button
                    onClick={(e) => deleteTaskHandler(e)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    {props.loading === props.id ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <>
                        {props.action}{" "}
                        <img
                          src="delete.png"
                          style={{ width: "15px", marginBottom: "3px" }}
                          alt=""
                        />
                      </>
                    )}
                  </button>
                ) : (
                  props.action !== 0 && (
                    <button
                      onClick={(e) => taskHandler(e)}
                      type="button"
                      className="btn btn-success btn-sm"
                    >
                      {props.loading === props.id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <>
                          {props.action}{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  )
                )}
              </p>
              <div
                className="float-end priorityBox"
                style={{
                  backgroundColor:
                    tasksList.priority === 0
                      ? "#00b200"
                      : tasksList.priority === 1
                      ? "#f7c321"
                      : tasksList.priority === 2
                      ? "#f72121"
                      : "", 
                }}
                title={
                  tasksList.priority === 0
                    ? "Low Priority"
                    : tasksList.priority === 1
                    ? "Medium Priority"
                    : tasksList.priority === 2
                    ? "High Priority"
                    : ""
                }
              ></div>
              <p className="mb-0">
                <img
                  alt="Employee Logo"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  className="thumb-sm rounded-circle mr-2"
                />{" "}
                <span
                  className="font-bold font-secondary text-muted"
                  style={{ fontSize: "13px" }}
                >
                  {props.givenByTo}
                </span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Card;
