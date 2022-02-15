import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler} className="form-control">
        <input
          type='text'
          name='names'
          placeholder='Pair Names' 
          className="form-control" />
        <input
          type='text'
          name='location'
          placeholder='Location' 
          className="form-control" />
        <textarea
          name='issue'
          placeholder='Describe your issue.' 
          className="form-control" />
        <button type='submit' className="btn btn-warning">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;