import { useState } from "react";
import "./css/styles.css";
import StorageManager from "../../services/StorageManager";
import egIMG from "./components/elogroup.png";

function Login() {
  // hooks
  const [login, setLogin] = useState(""); // Estado de login
  const [password, setPassword] = useState(""); // Estado de senha

  const loginHandler = (e) => {
    e.preventDefault();
    if (login === '' || password === '') { // Verifica se todos os campos estão preenchidos
      alert("Preencha todos os campos.");
      return;
    } else if (StorageManager.setAuthenticationSS(login, password)) { // Tenta fazer a autenticação do usuário
      window.location.href = "/Leads"; // Se a autenticação for bem sucedida, redireciona para a página de manutenção de leads
    } else {
      alert("Login ou senha incorretos.");
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrapper-login">
          <div className="container-header-form-img">
            <img src={egIMG} className="img-elogroup" alt="EloGroup" />
          </div>
          <form className="login-form" onSubmit={loginHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de login */}
            <h1 className="login-form-title"> Manutenção de Leads </h1>
            <div className="container-input">
              <input
                className={login !== "" ? "has-val input" : "input"}
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Login *"></span>
            </div>

            <div className="container-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha *"></span>
            </div>

            <div className="container-form-btn">
              <button className="form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1"> Não possui cadastro? </span>
              <a className="txt2" href="/newUser">
                Cadastrar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;