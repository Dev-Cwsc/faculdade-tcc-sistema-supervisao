import "../styles/pages.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
//import { Link } from "react-router-dom";
import Device from "../components/Device";
import StorageManager from "../../services/StorageManager";
import { useState, useEffect } from "react";

function Devices() {
  // const [deviceList, updateDeviceList] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    const timer = setInterval(async () => {
      console.log('updating devices...')
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const listDevices = async () => {
    let device = null;
    const DEVICES = await StorageManager.getJSONServerData("devices").filter(el => el.installation_name === { state });
    console.log({state})
    if (!DEVICES) {
      return <h1> Não há dispositivos cadastrados nessa instalação </h1>;
    } else {
      DEVICES.forEach(element => {
        device = Device({ name: element.device_name, id: element.id });
        return <device/>;
      });
    }
  }

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-devices">
          {listDevices}
        </div>
      </div>
    </div>
  );
}

export default Devices;