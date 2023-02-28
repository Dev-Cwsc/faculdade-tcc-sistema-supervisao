
import "../styles/pages.css";
import Navbar from "../components/Navbar";

function About() {
  // hooks

  return (
    <div className="container">
      <Navbar />
      <div className="container-monitor">
        <div className="wrapper-about">
          <div className="wrapper-about-text">
            <h1> Sistema de Gerenciamento de Energia </h1>
          </div>

          <div className="wrapper-about-text">
            <p>
              Esta aplicação foi desenvolvida com o objetivo de receber dados de consumo e enviar comandos via protocolo HTTP,
              possibilitando a um gestor energético controlar dispositivos conectados à rede elétrica e tomar decisões de
              gerenciamento. Foi utilizada a linguagem JavaScript em conjunto com o motor Node.js e a blibioteca React.js,
              bem como CSS e HTML para estilização e estruturação das páginas. A presente aplicação é fruto do meu trabalho
              de conclusão de curso.
            </p>
          </div>
          <div className="wrapper-about-text">
            <p>
              Carlos Willian Silva Camargos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;