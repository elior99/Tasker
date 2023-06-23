import React, { useEffect, useRef} from "react";
import CookieController from "../components/controller/CookieController";


function Modal(props) {
  const modalRef = useRef(null);

    const modalTask = props.modalData;

    const dueDate = new Date(modalTask.due_date);
    const createdDate = new Date(modalTask.createdAt);

    const formattedDateDue = dueDate.toLocaleDateString("en-GB");
    const formattedCreatedDate = createdDate.toLocaleDateString("en-GB");
    var userGroup = 0;


    const getCookie = CookieController();
    if(getCookie != 0) 
      userGroup = getCookie.group;

    


  useEffect(() => {
    const modalElement = modalRef.current;


    const hiddenEvent = () => {
        console.log(props.modalData._id);
      console.log("Modal closed");
   //   window.history.pushState(null, "", "/");
    //   return navigate("/");
      // Perform any necessary actions when the modal is closed
    };

   //  window.$(modalElement).modal("show");
    window.$(modalElement).on("hidden.bs.modal", hiddenEvent);

    return () => {
      //window.$(modalElement).off("hidden.bs.modal", hiddenEvent);
    };
  }, []);
  

  return (
    <div>
      <div
        className="modal fade"
        id={props.modalData._id}
        tabIndex="-1"
        aria-labelledby=""
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="">
                {props.modalData.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-4">
                    {" "}
                    <p className="dueDate">
                      <svg
                        style={{ margin: "0px 0px 5px 10px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                      </svg>{" "}
                      Due date: {formattedDateDue}
                    </p>
                  </div>
                  <div className="col-sm-4 ms-auto">
                    <p className="dueDate">
                      <svg
                        style={{ margin: "0px 0px 5px 10px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                      </svg>{" "}
                      Created date: {formattedCreatedDate}
                    </p>
                  </div>
                </div>
              </div>

              <br />
              <span style={{ fontWeight: "bold" }}>Description:</span>
              <hr style={{ margin: "10px 0px 10px 0px", opacity: ".09" }} />
              {props.modalData.description}
              <hr style={{ margin: "10px 0px 10px 0px", opacity: ".09" }} />
              <p className="mb-0">
                  <img
                    alt="UserLogo"
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="thumb-sm rounded-circle mr-2"
                  />{" "}
                  <span className="font-bold text-muted" style={{ fontSize: "13px" }}>
                    {props.givenByTo}{" "}
                    {userGroup === 2
                      ? "(Employee)"
                      : userGroup === 1
                      ? "(Manager)"
                      : ""}
                  </span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
