import React, { useEffect, useState } from "react";
import Card from "../components/Card";

function CardContainer(props) {

  return (

      <div className="col-lg-4">
        <div className="card-box">
          <h4 className="text-dark pb-3">{props.title}</h4>
          {props.children}
        </div>
      </div>
  );
}

export default CardContainer;
