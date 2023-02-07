import "../styles/pages.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
// import Device from "../components/Device";
import StorageManager from "../../services/StorageManager";
import { useState, useEffect } from "react";

function Devices() {
  const [deviceList, setDeviceList] = useState([]);
  const { state } = useLocation();

  /*const listDevices = async () => {
    
    let array = [];
    if (!DEVICES) {
      array.push(<h1> Não existem dispositivos cadastrados. </h1>);
    } else {
      DEVICES.filter(el => el.installation_name === state).forEach(element => {
        array.push(<h1>{element.device_name}</h1>);
      });
    }
    return array;
  }*/

  useEffect(() => {
    const timer = setInterval(async () => {
      const DEVICES = await StorageManager.getJSONServerData("devices");
      let deviceArray = [];
      if (!DEVICES) {
        deviceArray.push(<h1> Não existem dispositivos cadastrados. </h1>);
      } else {
        DEVICES.filter(el => el.installation_name === state).forEach(element => {
          deviceArray.push(<h1>{element.device_name}</h1>);
        });
      }
      setDeviceList(deviceArray);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-devices">
          {deviceList}
        </div>
      </div>
    </div>
  );
}

export default Devices;