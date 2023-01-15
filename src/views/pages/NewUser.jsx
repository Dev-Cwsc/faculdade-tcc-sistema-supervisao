import { useState } from "react";
import "../styles/pages.css";
import StorageManager from "../../services/StorageManager";
import Input from "../components/Input";
import FormBtn from "../components/FormBtn";
import { Link } from "react-router-dom";

function Login() {
  // hooks
  const [login, setLogin] = useState(""); // Estado de login
  const [password, setPassword] = useState(""); // Estado de senha
  const [cnfPassword, setCnfPassword] = useState(""); // Estado de confirmação de senha
  const regexTest = RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"); // Regex para testar a senha

  const submitHandler = async (e) => {
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
    } else if (await StorageManager.registerUser(login, password)) { // Se todos os requisitos forem atendidos, tenta criar o usuário
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
    <div className="container-login">
      <div className="wrapper-login">
        <img src={process.env.PUBLIC_URL + '/images/ifmg-completa.png'} className="img-ifmg" alt="IFMG" />
        <form className="login-form" onSubmit={submitHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de cadastro */}
          <h1 className="login-form-title"> Cadastro de novo usuário </h1>
          <Input
            type="text"
            name="login-input-sign-up"
            className={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Login *"
          />
          <div className="form-input-spacing"></div>
          <Input
            type="password"
            name="password-input-sign-up"
            className={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha *"
          />
          <label className="txt-label-password">(Pelo menos 8 caracteres, incluindo caracteres especiais, letras e números)</label>
          <div className="form-input-spacing"></div>
          <Input
            type="password"
            name="password-cnf-input-sign-up"
            className={cnfPassword}
            onChange={(e) => setCnfPassword(e.target.value)}
            placeholder="Confirme sua senha *"
          />
          <div className="form-input-spacing"></div>
          <div className="form-input-spacing"></div>
          <FormBtn name="Cadastrar" />
          <div className="container-label-cadastro">
            <span className="txt-label-cadastro">Já possui cadastro? </span>
            <Link className="txt-link-cadastro" to="/">Entrar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;