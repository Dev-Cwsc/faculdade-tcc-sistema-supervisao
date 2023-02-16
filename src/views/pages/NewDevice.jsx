import "../styles/pages.css";
import { useState } from "react";
import StorageManager from "../../services/StorageManager";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import FormBtn from "../components/FormBtn";
import SelectionMenu from "../components/SelectionMenu";

function NewDevice() {
  // hooks
  const [id, setId] = useState(""); // Estado de login
  const [name, setDeviceName] = useState(""); // Estado de senha
  const [installation, setDeviceInstallation] = useState();

  const submitHandler = async (e) => {
    e.preventDefault(); // Evita que a página seja recarregada
    if (id === "" || name === "") { // Verifica se todos os campos estão preenchidos
      alert("Preencha todos os campos."); // Se não estiverem, exibe uma mensagem de erro
      return;
    } else if (await StorageManager.registerDevice(id, name, installation)) { // Se todos os requisitos forem atendidos, tenta criar o usuário
      alert("Dispositivo cadastrado com sucesso!"); // Exibe uma mensagem de sucesso
      setId(""); // Limpa os campos
      setDeviceName("");
      window.location.href = "/monitor"; // Redireciona para a página principal
    } else { // Se não conseguir fazer o cadastro corretamente exibe uma mensagem de erro
      alert("Erro ao tentar cadastrar o dispositivo.");
    }
  }

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-newDevice">
          <form onSubmit={submitHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de cadastro */}
            <h1 className="login-form-title"> Cadastro de novo dispositivo </h1>
            <Input
              type="text"
              name="device-id-input"
              className={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID do dispositivo *"
            />
            <div className="form-input-spacing"></div>
            <Input
              type="text"
              name="device-name-input"
              className={name}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Nome do dispositivo *"
            />
            <div className="form-input-spacing"></div>
            <SelectionMenu
              name="device-installation-select"
              labelName="Escolha a instalação: "
              onChange={(e) => setDeviceInstallation(e.target.value)}
            />
            <div className="form-input-spacing"></div>
            <div className="form-input-spacing"></div>
            <FormBtn name="Cadastrar" />
            <div className="form-input-spacing"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewDevice;