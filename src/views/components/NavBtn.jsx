import React from 'react'
import "../styles/NavBtn.css"
import { Link } from "react-router-dom";

const NavBtn = ({ name, onClick, btnLabel, to }) => {
  return (
    <Link
      to={to}
      name={name}
      id={name} className="nav-btn"
      onClick={onClick}>{btnLabel}
    </Link>
  )
}

export default NavBtn