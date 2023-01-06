import "../styles/styles.css";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Monitor() {
  // hooks

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="container-elements"></div>
      </div>
    </div>
  );
}

export default Monitor;