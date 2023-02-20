import "../styles/pages.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Device from "../components/Device";
import StorageManager from "../../services/StorageManager";
import { useState, useEffect, Fragment } from "react";

const ENDPOINT = "https://xn--richardsontrembo-snb.requestcatcher.com/"; // Antes de usar a aplicação é necessário configurar o endpoint que receberá as post requests

function Devices() {

  const [deviceList, setDeviceList] = useState([
    <Fragment key="loading">
      <div className="wrapper-loading-devices">
        <h1 className="loading-devices-txt"> Carregando... </h1>
      </div>
    </Fragment>
  ]);
  const { state } = useLocation();

  const isDeviceOnline = (update) => {  // Verifica se o dispositivo está online ou offline
    let c_date = new Date(); // Formato do timestamp 2023-02-19T14:24:32.921Z
    // Se a diferença entre a hora atual e o último update for menor ou igual a 5 segundos, considera o dispositivo como online
    let is_online = (c_date.getTime() - new Date(update).getTime()) / 1000 <= 5.0 ? true : false;
    return is_online;
  }

  useEffect(() => {
    const timer = setInterval(async () => {
      const DEVICES = await StorageManager.getDevices();
      let deviceArray = [];
      if (DEVICES.filter(el => el.installation_name === state).length === 0) {
        deviceArray.push(
          <Fragment key="empty">
            <div className="wrapper-loading-devices">
              <h1 className="loading-devices-txt"> Não há dispositivos cadastrados nessa instalação. </h1>
            </div>
          </Fragment>
        );
      } else {
        DEVICES.filter(el => el.installation_name === state).forEach(element => {
          if (isDeviceOnline(element.last_update)) {
            deviceArray.push(
              <Fragment key={element.id}>
                <Device
                  name={element.device_name}
                  id={element.id}
                  consumption_ch1={parseFloat(element.measurement_ch1).toFixed(2)}
                  consumption_ch2={parseFloat(element.measurement_ch2).toFixed(2)}
                  consumption={((parseFloat(element.measurement_ch1) + parseFloat(element.measurement_ch2)) * 127).toFixed(2)}
                  ch1_state={true}
                  ch2_state={true}
                  endpoint={ENDPOINT}
                />
              </Fragment>
            );
          } else {
            deviceArray.push(
              <Fragment key={element.id}>
                <Device
                  name={element.device_name}
                  id={element.id}
                  consumption_ch1="0"
                  consumption_ch2="0"
                  consumption="Offline"
                  ch1_state={false}
                  ch2_state={false}
                  endpoint={ENDPOINT}
                />
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