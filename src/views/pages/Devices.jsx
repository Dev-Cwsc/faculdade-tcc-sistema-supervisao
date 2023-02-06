import "../styles/pages.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
//import { Link } from "react-router-dom";
import Device from "../components/Device";

function Devices() {
  // hooks
  const { state } = useLocation();

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-devices">
          <Device name={state} id="teste"/>
        </div>
      </div>
    </div>
  );
}

export default Devices;