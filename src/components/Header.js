import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <h1> Help Queue</h1>
          <Link to="/" className='btn btn-primary'>Home</Link>
          <Link to="/signin" className='btn btn-warning'>Sign In</Link>
    </React.Fragment>
  );
}

export default Header;