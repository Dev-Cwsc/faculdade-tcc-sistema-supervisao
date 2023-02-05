import React from "react"
import "../styles/Input.css"

const Input = ({ type, name, className, onChange, placeholder }) => {
  return (
    <div className="container-input">
      <input
        className={className !== "" ? "has-val input" : "input"}
        type={type}
        name={name}
        id={name}
        value={className}
        onChange={onChange}
      />
      <span className="focus-input" data-placeholder={placeholder}></span>
    </div>
  )
}

export default Input