import React from "react"
import "../styles/SelectionMenu.css"

const SelectionMenu = ({ name, labelName, onChange }) => {
  return (
    <div>
      <label className="txt-label-select"> {labelName} </label>
      <select className="selection-menu" name={name} id={name} onChange={onChange}>
        <option value="biblioteca"> Biblioteca </option>
        <option value="refeitorio"> Refeitório </option>
        <option value="alojamento"> Alojamento </option>
        <option value="predio-pedagogico"> Prédio pedagógico </option>
        <option value="centro-convivencia"> Centro de convivência </option>
      </select>
    </div>
  )
}

export default SelectionMenu