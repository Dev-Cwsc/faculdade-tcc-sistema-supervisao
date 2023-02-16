import "../styles/pages.css";
import { useState } from "react";
import StorageManager from "../../services/StorageManager";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import FormBtn from "../components/FormBtn";

function DeleteDevice() {
  // hooks
  const [id, setId] = useState(""); // Estado de login

  const submitHandler = async (e) => {
    e.preventDefault(); // Evita que a página seja recarregada
    if (id === "") { // Verifica se todos os campos estão preenchidos
      alert("É necessário inserir o ID do dispositivo para removê-lo do sistema."); // Se não estiverem, exibe uma mensagem de erro
      return;
    } else if (await StorageManager.removeDevice(id)) { // Se todos os requisitos forem atendidos, tenta criar o usuário
      alert("Dispositivo removido com sucesso!"); // Exibe uma mensagem de sucesso
      setId(""); // Limpa os campos
      window.location.href = "/monitor"; // Redireciona para a página principal
    } else { // Se não conseguir fazer o cadastro corretamente exibe uma mensagem de erro
      alert("Erro ao tentar remover o dispositivo.");
    }
  }

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-newDevice">
          <form onSubmit={submitHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de cadastro */}
            <h1 className="login-form-title"> Remover dispositivo </h1>
            <Input
              type="text"
              name="device-id-input"
              className={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID do dispositivo *"
            />
            <div className="form-input-spacing"></div>
            <div className="form-input-spacing"></div>
            <FormBtn name="Remover" />
            <div className="form-input-spacing"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteDevice;