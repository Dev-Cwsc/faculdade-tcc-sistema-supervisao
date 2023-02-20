import React from "react"
import "../styles/Device.css";
import axios from "axios";

const Device = ({ name, id, consumption_ch1, consumption_ch2, consumption, ch1_state, ch2_state, endpoint }) => {

  const btnClickHandler = async (e) => {
    e.preventDefault();
    const CHANNEL = e.target.key === "ch1" ? "ch1" : "ch2";
    const DEVICE_ID = e.target.id;
    
    console.log(e.target.key);
    console.log(DEVICE_ID);

    await axios.post(endpoint, { "channel": { CHANNEL }, "device_id": { DEVICE_ID } }).then(response => {
      console.log("Status code: " + response.status + ", Status text: " + response.statusText);
    })
      .catch(error => {
        console.error(error.message);
      });
  }

  return (
    <div>
      <div className="container-device">
        <div className="container-device-title">
          <h1>{name} ({id}) </h1>
        </div>
        <div className="wrapper-device-elements">
          <div className="wrapper-device-txt">
            <p className="device-labels">Corrente CH1: {consumption_ch1} A</p>
            <p className="device-labels">Corrente CH2: {consumption_ch2} A</p>
            <p className="device-labels">Consumo(Watts): {consumption}</p>
          </div>
          <div className="wrapper-device-btn">
            <button onClick={btnClickHandler} key="ch1" id={id} className={ch1_state === true ? "device-btn-activated" : "device-btn-deactivated"}>ch1</button>
            <button onClick={btnClickHandler} key="ch2" id={id} className={ch2_state === true ? "device-btn-activated" : "device-btn-deactivated"}>ch2</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Device