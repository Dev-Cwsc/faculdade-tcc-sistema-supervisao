import "../styles/pages.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MonitorElement from "../components/MonitorElement";
import { useNavigate } from "react-router-dom";
import StorageManager from "../../services/StorageManager";

function Monitor() {

  const [deviceData, setMonitorData] = useState({ biblioteca: "Carregando...", 
                                                  refeitorio: "Carregando...", 
                                                  alojamento: "Carregando...", 
                                                  predio_pedagogico: "Carregando...", 
                                                  centro_convivencia: "Carregando..." });
  const navigate = useNavigate();

  const toDevicePage = (installation) => {
    navigate("/devices", { state: installation });
  };

  const updateMonitorData = async () => {
    const DATA = await StorageManager.getJSONServerData("last_update");
    let powerUpdate = { biblioteca: "", refeitorio: "", alojamento: "", predio_pedagogico: "", centro_convivencia: "" };

    DATA.filter(el => el.installation_name === "biblioteca").forEach(element => {
      powerUpdate.biblioteca = ((parseFloat(element.measurement_ch1 === "" ? 0 : element.measurement_ch1) 
      + parseFloat(element.measurement_ch2 === "" ? 0 : element.measurement_ch1)) * 127).toFixed(2);
    });
    DATA.filter(el => el.installation_name === "refeitorio").forEach(element => {
      powerUpdate.refeitorio = ((parseFloat(element.measurement_ch1 === "" ? 0 : element.measurement_ch1) 
      + parseFloat(element.measurement_ch2 === "" ? 0 : element.measurement_ch1)) * 127).toFixed(2);
    });
    DATA.filter(el => el.installation_name === "alojamento").forEach(element => {
      powerUpdate.alojamento = ((parseFloat(element.measurement_ch1 === "" ? 0 : element.measurement_ch1) 
      + parseFloat(element.measurement_ch2 === "" ? 0 : element.measurement_ch1)) * 127).toFixed(2);
    });
    DATA.filter(el => el.installation_name === "predio_pedagogico").forEach(element => {
      powerUpdate.predio_pedagogico = ((parseFloat(element.measurement_ch1 === "" ? 0 : element.measurement_ch1) 
      + parseFloat(element.measurement_ch2 === "" ? 0 : element.measurement_ch1)) * 127).toFixed(2);
    });
    DATA.filter(el => el.installation_name === "centro_convivencia").forEach(element => {
      powerUpdate.centro_convivencia = ((parseFloat(element.measurement_ch1 === "" ? 0 : element.measurement_ch1) 
      + parseFloat(element.measurement_ch2 === "" ? 0 : element.measurement_ch1)) * 127).toFixed(2);
    });
    setMonitorData(powerUpdate);
  };

  useEffect(() => {
    const timer = setInterval(async () => {
      await updateMonitorData();
    }, 2000);
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
              onClick={deviceData.biblioteca === "" || deviceData.biblioteca === "Carregando..." ? null : () => toDevicePage("biblioteca")}
              last_update={deviceData.biblioteca}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Refeitório"
              onClick={deviceData.refeitorio === "" || deviceData.refeitorio === "Carregando..."? null : () => toDevicePage("refeitorio")}
              last_update={deviceData.refeitorio}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Alojamento"
              onClick={deviceData.alojamento === "" || deviceData.alojamento === "Carregando..." ? null : () => toDevicePage("alojamento")}
              last_update={deviceData.alojamento}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Prédio Pedagógico"
              onClick={deviceData.predio_pedagogico === "" || deviceData.predio_pedagogico === "Carregando..." ? null : () => toDevicePage("predio_pedagogico")}
              last_update={deviceData.predio_pedagogico}
            />
            <div className="monitor-element-spacing"></div>
            <MonitorElement
              installation_name="Centro de Convivência"
              onClick={deviceData.centro_convivencia === "" || deviceData.centro_convivencia ? null : () => toDevicePage("centro_convivencia")}
              last_update={deviceData.centro_convivencia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;