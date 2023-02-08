import React from "react"
import "../styles/Device.css";
const Device = ({ name, id, consumption, ch1_state, ch2_state }) => {
  return (
    <div>
      <div className="container-device">
        <div className="container-device-title">
          <h1>{name} ({id}) </h1>
        </div>
        <div className="wrapper-device-elements">
          <label className="device-labels">Consumo(Watts): {consumption}</label>
          <div className="wrapper-device-btn">
            <button className={ch1_state === "true" ? "device-btn-activated" : "device-btn-deactivated"}>ch1</button>
            <button className={ch2_state === "true" ? "device-btn-activated" : "device-btn-deactivated"}>ch2</button>
          </div>
        </div>
      </div>
      <div className="device-spacing"></div>
    </div>
  )
}

export default Device