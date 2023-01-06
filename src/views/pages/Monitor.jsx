import "../styles/styles.css";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Monitor() {
  // hooks

  return (
    <div className="container">
      <Navbar />
      <h1 className="monitor-title"> Consumo atual </h1>
    </div>
  );
}

export default Monitor;