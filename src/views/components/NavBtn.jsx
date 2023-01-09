import React from 'react'
import "../styles/NavBtn.css"

const NavBtn = ({name, onClick, btnLabel}) => {
  return (
    <button name={name} id={name} className="nav-btn" onClick={onClick}>{btnLabel}</button>
  )
}

export default NavBtn