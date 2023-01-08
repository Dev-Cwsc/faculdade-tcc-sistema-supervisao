import React from 'react'
import "../styles/FormBtn.css";

const FormBtn = ({ name }) => {
    return (
        <button
            name={name}
            id={name}
            className="form-btn"> {name}
        </button>
    )
}

export default FormBtn