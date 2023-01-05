import { useState } from "react";
import "./css/styles.css";
import egIMG from "./components/elogroup.png";
import StorageManager from "../../services/StorageManager";

function NewLead() {
  // hooks
  const [leadName, setLogin] = useState("");
  const [phone, setPassword] = useState("");
  const [email, setCnfPassword] = useState("");
  const [checkBoxes, setAll] = useState(
    {
      "rpa": false,
      "digitalProduct": false,
      "analytics": false,
      "bpm": false
    }
  );

  const checkHandler = (e) => {
    if (e.target.name === "all") { // Se o checkbox marcado for o "all", marca ou desmarca todas as outras
      setAll({
        "rpa": e.target.checked,
        "digitalProduct": e.target.checked,
        "analytics": e.target.checked,
        "bpm": e.target.checked
      });
    } else { // Se não for o "all", atualiza o estado de acordo com o checkbox marcado
      setAll({
        ...checkBoxes,
        [e.target.name]: e.target.checked
      });
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (leadName === '' || phone === '' || email === '') { // Verifica se todos os campos estão preenchidos
      alert("Preencha todos os campos."); // Se não estiverem, exibe uma mensagem de erro
      return;
    } else if (checkBoxes["rpa"] === false && checkBoxes["digitalProduct"] === false && checkBoxes["analytics"] === false && checkBoxes["bpm"] === false) { // Verifica se o usuário marcou pelo menos uma das oportunidades
      alert("Escolha pelo menos uma das oportunidades."); // Se não marcou nenhuma, exibe uma mensagem de erro
      return;
    } else if (StorageManager.setLeadsLS(leadName, phone, email, { ...checkBoxes })) { // Se todos os campos estiverem preenchidos, tenta cadastrar o lead
      alert("Lead cadastrado com sucesso!"); // Se o lead foi cadastrado, exibe uma mensagem de sucesso
      window.location.href = "/Leads"; // Redireciona para a página de manutenção de leads
    }
  }

  const exitHandler = () => {
    window.location.href = "/"; // Redireciona para a página de login
    StorageManager.clearAuthenticationSS(); // Limpa o armazenamento de autenticação
  }

  return (
    <div className="container">
      <nav className="nav-bar">
        <div className="container-nav-bar-logo" onClick={() => window.location.href = "/Leads"}> {/* Ao clicar no logo, redireciona para a página de manutenção de leads */}
          <img src={egIMG} className="img-elogroup" alt="EloGroup" />
        </div>
        <div className="container-nav-bar-txt-welcome">
          <h1 className="nav-bar-txt-welcome"> Cadastrar novo Lead </h1>
        </div>
        <div className="container-nav-bar-btn">
          <button onClick={() => window.location.href = "/leads"} className="nav-bar-btn">Cancelar</button> {/* Ao clicar no logo, redireciona para a página de manutenção de leads */}
        </div>
        <div className="container-nav-bar-btn">
          <button onClick={exitHandler} className="nav-bar-btn">Sair</button> {/* Função manipuladora que é acionada ao clicar no botão "Sair" */}
        </div>
      </nav>
      <div className="container-nav-bar">
        <div className="wrapper-login-white">
          <form className="login-form" onSubmit={submitHandler}> {/* Função manipuladora que é acionada ao submeter o formulário de cadastro */}
            <h1 className="login-form-title-dark"> Dados de cadastro </h1>
            <div className="container-input">
              <input
                className={leadName !== "" ? "has-val-dark input-dark" : "input-dark"}
                type="text"
                value={leadName}
                onChange={(e) => setLogin(e.target.value)}
              />
              <span className="focus-input-dark" data-placeholder="Nome *"></span>
            </div>

            <div className="container-input">
              <input
                className={phone !== "" ? "has-val-dark input-dark" : "input-dark"}
                type="phone"
                value={phone}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input-dark" data-placeholder="Telefone *"></span>
            </div>

            <div className="container-input">
              <input
                className={email !== "" ? "has-val-dark input-dark" : "input-dark"}
                type="email"
                value={email}
                onChange={(e) => setCnfPassword(e.target.value)}
              />
              <span className="focus-input-dark" data-placeholder="Email *"></span>
            </div>
            <span className="txt1-darker">Oportunidades *</span>
            <div className="wrapper-checkboxes">
              <input className="checkbox" name="all" onChange={checkHandler} checked={checkBoxes.all} type="checkbox" /> {/* Função manipuladora que é disparada ao marcar qualquer uma das checkboxes */}
              <label className="checkbox-label">Todas</label>
              <input className="checkbox" name="rpa" onChange={checkHandler} checked={checkBoxes.rpa} type="checkbox" />
              <label className="checkbox-label">RPA</label>
              <input className="checkbox" name="digitalProduct" onChange={checkHandler} checked={checkBoxes.digitalProduct} type="checkbox" />
              <label className="checkbox-label">Produto Digital</label>
              <input className="checkbox" name="analytics" onChange={checkHandler} checked={checkBoxes.analytics} type="checkbox" />
              <label className="checkbox-label">Analytics</label>
              <input className="checkbox" name="bpm" onChange={checkHandler} checked={checkBoxes.bpm} type="checkbox" />
              <label className="checkbox-label">BPM</label>
            </div>
            <div className="container-form-btn">
              <button className="form-btn">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewLead;