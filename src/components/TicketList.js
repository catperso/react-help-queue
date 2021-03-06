import React from "react";
import Ticket from "./Ticket";
import PropTypes from 'prop-types';
// We need to import hooks functionality from both react-redux and react-redux-firebase.
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function TicketList(props){
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  useFirestoreConnect([ { collection: 'tickets' } ]);

  // The useSelector() hook comes from react-redux.
  const tickets = useSelector(state => state.firestore.ordered.tickets);

  if (isEmpty(tickets)) {
    return (
      <React.Fragment>
        <h3>No tickets!</h3>
      </React.Fragment>
    )
  }
  if (isLoaded(tickets)) {
    return (
      <React.Fragment>
        <hr/>
        {tickets.map((ticket) => {
          return <Ticket
            whenTicketClicked = { props.onTicketSelection }
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id}/>
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

TicketList.propTypes = {
  onTicketSelection: PropTypes.func
};

export default TicketList;