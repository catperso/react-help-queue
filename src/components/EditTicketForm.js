import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditTicketForm (props) {
  const firestore = useFirestore();
  const { ticket } = props;

  // function handleEditTicketFormSubmission(event) {
  //   event.preventDefault();
  //   props.onEditTicket({
  //     names: event.target.names.value || ticket.names, 
  //     location: event.target.location.value || ticket.location, 
  //     issue: event.target.issue.value || ticket.issue, 
  //     id: ticket.id,
  //     timeOpen: ticket.timeOpen,
  //     formattedWaitTime: ticket.formattedWaitTime
  //   });
  // }

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket();
    const propertiesToUpdate = {
      names: event.target.names.value || ticket.names,
      location: event.target.location.value || ticket.location,
      issue: event.target.issue.value || ticket.issue
    }
    return firestore.update({collection: 'tickets', doc: ticket.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
};

export default EditTicketForm;