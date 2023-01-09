import { useState } from "react";
import "../styles/pages.css";
import StorageManager from "../../services/StorageManager";
import Input from "../components/Input";
import FormBtn from "../components/FormBtn";
import { Link } from "react-router-dom";

function Login() {
  // hooks
  const [login, setLogin] = useState(""); // Conforme o usuário digita, atualiza o campo de login
  const [password, setPassword] = useState(""); // Conforme o usuário digita, atualiza o campo de senha

  const loginHandler = (e) => {
    e.preventDefault();
    if (login === '' || password === '') { // Verifica se todos os campos estão preenchidos
      alert("Preencha todos os campos.");
      return;
    } else if (StorageManager.setAuthenticationSS(login, password)) { // Tenta fazer a autenticação do usuário
      window.location.href = "/monitor"; // Se a autenticação for bem sucedida, redireciona para a página de manutenção de leads
    } else {
      alert("Login ou senha incorretos.");
      return;
    }
  }

  return (
    <div className="container-login">
      <div className="wrapper-login">
        <img src={process.env.PUBLIC_URL + '/images/ifmg-completa.png'} className="img-ifmg" alt="IFMG"/>
        <form onSubmit={loginHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de login */}
          <h1 className="login-form-title"> Sistema de Monitoramento de Cargas </h1>
          <Input
            type="text"
            name="login-input"
            className={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Login *"
          />
          <div className="form-input-spacing"></div>
          <Input
            type="password"
            name="password-input"
            className={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha *"
          />
          <div className="form-input-spacing"></div>
          <div className="form-input-spacing"></div>
          <FormBtn name="Login"/>
          <div className="container-label-cadastro">
            <span className="txt-label-cadastro"> Não possui cadastro? </span>
            <Link className="txt-link-cadastro" to="/newUser">Cadastrar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;