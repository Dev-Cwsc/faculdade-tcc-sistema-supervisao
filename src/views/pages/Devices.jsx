import "../styles/pages.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Device from "../components/Device";
import StorageManager from "../../services/StorageManager";
import { useState, useEffect } from "react";

function Devices() {
  const [deviceList, setDeviceList] = useState([<h1>Carregando...</h1>]);
  const { state } = useLocation();

  useEffect(() => {
    const timer = setInterval(async () => {
      const DEVICES = await StorageManager.getJSONServerData("devices");
      const DATA = await StorageManager.getJSONServerData("last_update");
      let update = null;

      let deviceArray = [];
      if (!DEVICES) {
        deviceArray.push(<h1> Não existem dispositivos cadastrados. </h1>);
      } else {
        DEVICES.filter(el => el.installation_name === state).forEach(element => {
          update = DATA.find(object => object.id === element.id);
          if (update) {
            deviceArray.push(<Device
              name={element.device_name}
              id={element.id}
              consumption={((parseFloat(update.measurement_ch1 === "" ? 0 : update.measurement_ch1) + parseFloat(update.measurement_ch2=== "" ? 0 : update.measurement_ch2)) * 127).toFixed(2)}
              ch1_state={update.measurement_ch1 !== "" ? "true" : "false"}
              ch2_state={update.measurement_ch2 !== "" ? "true" : "false"} />);
          } else {
            deviceArray.push(<Device
              name={element.device_name}
              id={element.id}
              consumption="Offline"
              ch1_state="false"
              ch2_state="false" />);
          }
        });
      }
      setDeviceList(deviceArray);
    }, 2000);
    return () => clearInterval(timer);
  }, [state]);

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