import "../styles/pages.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Device from "../components/Device";
import StorageManager from "../../services/StorageManager";
import { useState, useEffect } from "react";
import { Fragment } from 'react';

function Devices() {
  const [deviceList, setDeviceList] = useState([
    <Fragment key="loading">
      <div className="wrapper-loading-devices">
        <h1 className="loading-devices-txt"> Carregando... </h1>
      </div>
    </Fragment>
  ]);
  const { state } = useLocation();

  useEffect(() => {
    const timer = setInterval(async () => {
      const DEVICES = await StorageManager.getJSONServerData("devices");
      const DATA = await StorageManager.getJSONServerData("last_update");
      let update = null;
      let deviceArray = [];
      if (DEVICES.filter(el => el.installation_name === state).length === 0) {
        deviceArray.push(
          <Fragment key="loading">
            <div className="wrapper-loading-devices">
              <h1 className="loading-devices-txt"> Não há dispositivos cadastrados nessa instalação. </h1>
            </div>
          </Fragment>
        );
      } else {
        DEVICES.filter(el => el.installation_name === state).forEach(element => {
          update = DATA.find(object => object.id === element.id);
          if (update) {
            deviceArray.push(
              <Fragment key={element.id}>
                <Device
                  name={element.device_name}
                  id={element.id}
                  consumption={((parseFloat(update.measurement_ch1 === "" ? 0 : update.measurement_ch1) + parseFloat(update.measurement_ch2 === "" ? 0 : update.measurement_ch2)) * 127).toFixed(2)}
                  ch1_state={update.measurement_ch1 !== "" ? "true" : "false"}
                  ch2_state={update.measurement_ch2 !== "" ? "true" : "false"} />
              </Fragment>
            );
          } else {
            deviceArray.push(
              <Fragment key={element.id}>
                <Device
                  name={element.device_name}
                  id={element.id}
                  consumption="Offline"
                  ch1_state="false"
                  ch2_state="false" />
              </Fragment>
            );
          }
        });
      }
      setDeviceList(deviceArray);
    }, 1000);
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