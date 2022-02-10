import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      allowedToSubmit: 0,
      mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        allowedToSubmit: 0,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
        allowedToSubmit: 0
      }));
    }
  }

  advanceText = () => {
    this.setState(prevState => ({
      allowedToSubmit: prevState.allowedToSubmit += 1
    }));
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
        editing: false,
        selectedTicket: null
      });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let addAdvanceButton = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} 
                                            onClickingDelete = {this.handleDeletingTicket} 
                                            onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      if (this.state.allowedToSubmit === 0) {
        currentlyVisibleState = <p>"Have you gone through all the steps on the Learn How to Program debugging lesson?"</p>;
      } else if (this.state.allowedToSubmit === 1) {
        currentlyVisibleState = <p>"Have you asked another pair for help?"</p>;
      } else if (this.state.allowedToSubmit === 2) {
        currentlyVisibleState = <p>"Have you spent 15 minutes going through through the problem documenting every step?"</p>;
      } else if (this.state.allowedToSubmit >= 3) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      }
      if (this.state.allowedToSubmit < 3) {
        addAdvanceButton = <button onClick={this.advanceText} class="btn btn-warning">Yes I did!</button>;
      }
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {addAdvanceButton}
        <button onClick={this.handleClick} class="btn btn-info">{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;