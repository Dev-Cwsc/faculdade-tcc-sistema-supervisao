import "../styles/pages.css";
//import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Monitor() {

  const navigate = useNavigate();

  const toDevicePage = (installation) => {
    navigate("/devices", { state: installation });
  }

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="container-elements">
          <div className="wrapper-elements">
            <div onClick={()=>{toDevicePage("biblioteca")}} className="monitor-element">
              <label className="txt-element"> Biblioteca (700W) </label>
            </div>
            <div className="monitor-element-spacing"></div>
            <div onClick={()=>{toDevicePage("refeitorio")}} className="monitor-element">
              <label className="txt-element"> Refeitório (Offline) </label>
            </div>
            <div className="monitor-element-spacing"></div>
            <div onClick={()=>{toDevicePage("alojamento")}} className="monitor-element">
              <label className="txt-element"> Alojamento (Offline) </label>
            </div>
            <div className="monitor-element-spacing"></div>
            <div onClick={()=>{toDevicePage("predio-pedagogico")}} className="monitor-element">
              <label className="txt-element"> Prédio Pedagógico (Offline) </label>
            </div>
            <div className="monitor-element-spacing"></div>
            <div onClick={()=>{toDevicePage("centro-convivencia")}} className="monitor-element">
              <label className="txt-element"> Centro de Convivência (Offline) </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;