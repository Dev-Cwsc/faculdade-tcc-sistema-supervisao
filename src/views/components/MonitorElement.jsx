import React from "react"
import "../styles/MonitorElement.css";

const MonitorElement = ({ onClick, installation_name, last_update }) => {
  return (
    <div onClick={onClick} className={last_update === "" ? "monitor-element-offline" : "monitor-element"}>
      <label className="txt-element"> {installation_name} ({last_update === "" ? "Offline" : last_update}) </label>
    </div>
  )
}

export default MonitorElement