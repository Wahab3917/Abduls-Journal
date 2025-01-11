import React from 'react';
import loader from "../images/loader.gif";

function Loader() {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loader" />
    </div>
  )
}

export default Loader