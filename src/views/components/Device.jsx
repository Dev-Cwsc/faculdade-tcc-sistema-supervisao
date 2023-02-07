import React from "react"
import "../styles/Device.css";
const Device = ({ name, id, consumption, CH1state, CH2state }) => {
  return (
    <div className="container-device">
      <div className="container-device-title">
        <h1>{name} ({id}) </h1>
      </div>
      <div className="wrapper-device-elements">
        <label className="device-labels">Consumo: 700W</label>
        <div className="wrapper-device-btn">
          <button className="device-btn-activated">ch1</button>
          <button className="device-btn-activated">ch2</button>
        </div>
      </div>
    </div>
  )
}

export default Device