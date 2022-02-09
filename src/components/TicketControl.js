import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      allowedToSubmit: 0
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
      allowedToSubmit: 0
    }));
  }

  advanceText = () => {
    this.setState(prevState => ({
      allowedToSubmit: prevState.allowedToSubmit += 1
    }));
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let addAdvanceButton = null;
    if (this.state.formVisibleOnPage) {
      if (this.state.allowedToSubmit === 0) {
        currentlyVisibleState = <p>"Have you gone through all the steps on the Learn How to Program debugging lesson?"</p>;
      } else if (this.state.allowedToSubmit === 1) {
        currentlyVisibleState = <p>"Have you asked another pair for help?"</p>;
      } else if (this.state.allowedToSubmit === 2) {
        currentlyVisibleState = <p>"Have you spent 15 minutes going through through the problem documenting every step?"</p>;
      } else if (this.state.allowedToSubmit >= 3) {
        currentlyVisibleState = <NewTicketForm />;
      }
      if (this.state.allowedToSubmit < 3) {
        addAdvanceButton = <button onClick={this.advanceText} class="btn btn-warning">Yes I did!</button>;
      }
      buttonText = "Return to ticket list";
    } else {
      currentlyVisibleState = <TicketList />;
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