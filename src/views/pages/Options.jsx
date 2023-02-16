import "../styles/pages.css";
import Navbar from "../components/Navbar";
import OptionsBtn from "../components/OptionsBtn";

function Options() {

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-options">
          <h1 className="login-form-title"> Selecione uma opção: </h1>
          <OptionsBtn name="new-device-page" btnLabel="Cadastrar dispositivo" to="/newDevice" />
          <OptionsBtn name="delete-device-page" btnLabel="Remover dispositivo" to="/deleteDevice" />
          <OptionsBtn name="new-user-page" btnLabel="Cadastrar usuário" to="/newUser" />
          <OptionsBtn name="about-page" btnLabel="Sobre" to="/about" />
          <div className="form-input-spacing"></div>
        </div>
      </div>
    </div>
  );
}

export default Options;