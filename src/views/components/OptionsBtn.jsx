import React from "react"
import "../styles/OptionsBtn.css"
import { Link } from "react-router-dom";

const OptionsBtn = ({ name, onClick, btnLabel, to }) => {
  return (
    <Link
      to={to}
      name={name}
      id={name} className="options-btn"
      onClick={onClick}>{btnLabel}
    </Link>
  )
}

export default OptionsBtn