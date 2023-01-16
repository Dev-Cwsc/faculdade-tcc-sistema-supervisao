import "../styles/pages.css";
//import { useState } from "react";
import { useState } from "react";
import StorageManager from "../../services/StorageManager";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import FormBtn from "../components/FormBtn";

function NewDevice() {
  // hooks
  const [id, setLogin] = useState(""); // Estado de login
  const [name, setPassword] = useState(""); // Estado de senha

  const submitHandler = async (e) => {
    e.preventDefault(); // Evita que a página seja recarregada
    if (id === '' || name === '') { // Verifica se todos os campos estão preenchidos
      alert("Preencha todos os campos."); // Se não estiverem, exibe uma mensagem de erro
      return;
    } else if (await StorageManager.registerUser(id, name)) { // Se todos os requisitos forem atendidos, tenta criar o usuário
      alert('Usuário e senha cadastrados com sucesso!'); // Exibe uma mensagem de sucesso
      setLogin(""); // Limpa os campos
      setPassword("");
      window.location.href = "/"; // Redireciona para a página principal
    } else { // Se não conseguir fazer o cadastro corretamente exibe uma mensagem de erro
      alert('Erro ao cadastrar usuário e senha');
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
              name="login-input-sign-up"
              className={id}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="ID do dispositivo *"
            />
            <div className="form-input-spacing"></div>
            <Input
              type="password"
              name="password-input-sign-up"
              className={name}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha *"
            />
            <div className="form-input-spacing"></div>
            <Input
              type="password"
              name="password-cnf-input-sign-up"
              className={name}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirme sua senha *"
            />
            <div className="form-input-spacing"></div>
            <div className="form-input-spacing"></div>
            <FormBtn name="Cadastrar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewDevice;