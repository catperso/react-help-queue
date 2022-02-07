import React from "react";

function Ticket(props){
  const name = "Thato";
  const name2 = "Haley";
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

export default Ticket;