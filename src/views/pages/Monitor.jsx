import "../styles/pages.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MonitorElement from "../components/MonitorElement";
import { useNavigate } from "react-router-dom";
import StorageManager from "../../services/StorageManager";

function Monitor() {
  const [deviceData, setMonitorData] = useState({
    biblioteca: "Carregando...",
    refeitorio: "Carregando...",
    alojamento: "Carregando...",
    predio_pedagogico: "Carregando...",
    centro_convivencia: "Carregando..."
  });
  const navigate = useNavigate();

  const isDeviceOnline = (update) => {  // Verifica se o dispositivo está online ou offline
    let c_date = new Date(); // Formato do timestamp 2023-02-19T14:24:32.921Z
    // Se a diferença entre a hora atual e o último update for menor ou igual a 5 segundos, considera o dispositivo como online
    let is_online = (c_date.getTime() - new Date(update).getTime()) / 1000 <= 5.0 ? true : false;
    return is_online;
  }

  const toDevicePage = (installation) => {
    navigate("/devices", { state: installation });
  };

  const updateMonitorData = async () => {
    const DATA = await StorageManager.getDevices();
    let powerUpdate = { biblioteca: "", refeitorio: "", alojamento: "", predio_pedagogico: "", centro_convivencia: "" };

    DATA.filter(el => el.installation_name === "biblioteca").forEach(element => {
      if (isDeviceOnline(element.last_update)) {
        powerUpdate.biblioteca = parseFloat(parseFloat(powerUpdate.biblioteca === "" ? 0 : powerUpdate.biblioteca)
          + ((parseFloat(element.measurement_ch1) + parseFloat(element.measurement_ch2)) * 127)).toFixed(2);
      }
    });
    DATA.filter(el => el.installation_name === "refeitorio").forEach(element => {
      if (isDeviceOnline(element.last_update)) {
        powerUpdate.refeitorio = parseFloat(parseFloat(powerUpdate.refeitorio === "" ? 0 : powerUpdate.refeitorio)
          + ((parseFloat(element.measurement_ch1) + parseFloat(element.measurement_ch2)) * 127)).toFixed(2);
      }
    });
    DATA.filter(el => el.installation_name === "alojamento").forEach(element => {
      if (isDeviceOnline(element.last_update)) {
        powerUpdate.alojamento = parseFloat(parseFloat(powerUpdate.alojamento === "" ? 0 : powerUpdate.alojamento)
          + ((parseFloat(element.measurement_ch1) + parseFloat(element.measurement_ch2)) * 127)).toFixed(2);
      }
    });
    DATA.filter(el => el.installation_name === "predio_pedagogico").forEach(element => {
      if (isDeviceOnline(element.last_update)) {
        powerUpdate.predio_pedagogico = parseFloat(parseFloat(powerUpdate.predio_pedagogico === "" ? 0 : powerUpdate.predio_pedagogico)
          + ((parseFloat(element.measurement_ch1) + parseFloat(element.measurement_ch2)) * 127)).toFixed(2);
      }
    });
    DATA.filter(el => el.installation_name === "centro_convivencia").forEach(element => {
      if (isDeviceOnline(element.last_update)) {
        powerUpdate.centro_convivencia = parseFloat(parseFloat(powerUpdate.centro_convivencia === "" ? 0 : powerUpdate.centro_convivencia)
          + ((parseFloat(element.measurement_ch1) + parseFloat(element.measurement_ch2)) * 127)).toFixed(2);
      }
    });
    setMonitorData(powerUpdate);
  };

  useEffect(() => {
    const timer = setInterval(async () => {
      await updateMonitorData();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="container-elements">
          <div className="wrapper-elements">
            <MonitorElement
              installation_name="Biblioteca"
              onClick={deviceData.biblioteca === "Carregando..." ? null : () => toDevicePage("biblioteca")}
              last_update={deviceData.biblioteca}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Refeitório"
              onClick={deviceData.refeitorio === "Carregando..." ? null : () => toDevicePage("refeitorio")}
              last_update={deviceData.refeitorio}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Alojamento"
              onClick={deviceData.alojamento === "Carregando..." ? null : () => toDevicePage("alojamento")}
              last_update={deviceData.alojamento}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Prédio Pedagógico"
              onClick={deviceData.predio_pedagogico === "Carregando..." ? null : () => toDevicePage("predio_pedagogico")}
              last_update={deviceData.predio_pedagogico}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Centro de Convivência"
              onClick={deviceData.centro_convivencia === "Carregando..." ? null : () => toDevicePage("centro_convivencia")}
              last_update={deviceData.centro_convivencia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;