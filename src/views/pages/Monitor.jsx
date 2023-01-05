import "./css/styles.css";
import egIMG from "./components/ifmg-completa.png";
import StorageManager from "../../services/StorageManager";
import { useState } from "react";

function Monitor() {
  // hooks

  const user = StorageManager.getLoggedUser(); // Pega o usuário logado

  const exitHandler = () => {
    window.location.href = "/"; // Redireciona para a página de login
    StorageManager.clearAuthenticationSS(); // Limpa o armazenamento de autenticação
  }

  return (
    <div className="container">
      <nav className="nav-bar">
        <div className="container-nav-bar-img" onClick={() => window.location.href = "https://www.bambui.ifmg.edu.br/portal/"}> {/* Ao clicar no logo, redireciona para a página de manutenção de leads */}
          <img src={egIMG} className="img-ifmg-nav" />
        </div>
        <div className="container-nav-bar-txt-welcome">
          <h1 className="nav-bar-txt-welcome"> Bem vindo(a) ao Sistema de Monitoramento de Cargas {`${user.toUpperCase()}!`} </h1>
        </div>
        <div className="container-nav-bar-btn">
          <button onClick={exitHandler} className="nav-bar-btn">Sair</button> {/* Função manipuladora que é acionada ao clicar no botão "Sair" */}
        </div>
      </nav>
      <div className="container-nav-bar">
        <div className="wrapper-login-white">
          <h1 className="login-form-title"> Consumo atual </h1>
          
        </div>
      </div>
    </div>
  );
}

export default Monitor;