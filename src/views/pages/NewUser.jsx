import { useState } from "react";
import "./css/styles.css";
import StorageManager from "../../services/StorageManager";
import egIMG from "./components/elogroup.png";

function Login() {
  // hooks
  const [login, setLogin] = useState(""); // Estado de login
  const [password, setPassword] = useState(""); // Estado de senha
  const [cnfPassword, setCnfPassword] = useState(""); // Estado de confirmação de senha
  const regexTest = RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"); // Regex para testar a senha

  const submitHandler = (e) => {
    e.preventDefault(); // Evita que a página seja recarregada
    if (login === '' || password === '' || cnfPassword === '') { // Verifica se todos os campos estão preenchidos
      alert("Preencha todos os campos."); // Se não estiverem, exibe uma mensagem de erro
      return;
    } else if (password !== cnfPassword) { // Verifica se as senhas são iguais
      alert("As senhas não conferem."); // Se não forem, exibe uma mensagem de erro
      return;
    } else if (!regexTest.test(password)) { // Se a senha não estiver no padrão
      alert("A senha deve conter pelo menos 8 caracteres, incluindo caracteres especiais, letras e números."); // Exibe uma mensagem de erro
      return;
    } else if (StorageManager.setUserLS(login, password)) { // Se todos os requisitos forem atendidos, tenta criar o usuário
      alert('Usuário e senha cadastrados com sucesso!'); // Exibe uma mensagem de sucesso
      setLogin(""); // Limpa os campos
      setPassword("");
      setCnfPassword("");
      window.location.href = "/"; // Redireciona para a página principal
    } else { // Se não conseguir fazer o cadastro corretamente exibe uma mensagem de erro
      alert('Erro ao cadastrar usuário e senha');
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrapper-login">
          <div className="container-header-form-img">
            <img src={egIMG} className="img-elogroup" alt="EloGroup" />
          </div>
          <form className="login-form" onSubmit={submitHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de cadastro */}
            <h1 className="login-form-title"> Cadastro de novo usuário </h1>
            <div className="container-input">
              <input
                className={login !== "" ? "has-val input" : "input"}
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Login *"></span>
            </div>

            <div className="container-input-password">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha *"></span>
            </div>
            <div className="container-label-password">
              <label className="txt-label-password">(Pelo menos 8 caracteres, incluindo caracteres especiais, letras e números)</label>
            </div>

            <div className="container-input">
              <input
                className={cnfPassword !== "" ? "has-val input" : "input"}
                type="password"
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Confirme sua senha *"></span>
            </div>

            <div className="container-form-btn">
              <button className="form-btn">Cadastrar</button>
            </div>

            <div className="text-center">
              <span className="txt1">Já possui cadastro? </span>
              <a className="txt2" href="/">
                Entrar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;