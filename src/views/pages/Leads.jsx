import "./css/styles.css";
import egIMG from "./components/elogroup.png";
import StorageManager from "../../services/StorageManager";
import { useState } from "react";

function Leads() {
  // hooks
  let [leadList, updateLeadList] = useState(StorageManager.getLeadsLS());

  const user = StorageManager.getLoggedUser(); // Pega o usuário logado

  const mouseDragHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Realmente deseja avançar uma etapa? Esta ação não poderá ser desfeita.")) { // Confirmação de avanço de etapa
      leadList = StorageManager.updateStateLeadLS(e.target.id); // Atualiza o estado do lead
      updateLeadList(leadList); // Atualiza a lista de leads
      window.location.reload(false); // Recarrega a página
    }
  }

  const exitHandler = () => {
    window.location.href = "/"; // Redireciona para a página de login
    StorageManager.clearAuthenticationSS(); // Limpa o armazenamento de autenticação
  }

  const leadSearch = () => {
    if (!leadList) return (<></>) // Se não existirem leads cadastrados, retorna um elemento vazio
    return leadList.map((value, index) => {
      if (value.status === "Cliente em potencial") { // Se o status for igual ao valor "Cliente em potencial", posiciona na primeira coluna
        return (<tr key={index}>
          <td className="table-cell" id={index} draggable={true} onDragEnd={mouseDragHandler}>{value.name}</td> {/* Função manipuladora que é disparada ao arrastar o componente */}
          <td className="table-cell" ></td>
          <td className="table-cell" ></td>
        </tr>)
      }
      if (value.status === "Dados confirmados") { // Se o status for igual ao valor "Dados confirmados", posiciona na segunda coluna
        return (<tr key={index}>
          <td className="table-cell"></td>
          <td className="table-cell" id={index} draggable={true} onDragEnd={mouseDragHandler}>{value.name}</td>
          <td className="table-cell" ></td>
        </tr>)
      }
      if (value.status === "Reunião agendada") { // Se o status for igual ao valor "Reunião agendada", posiciona na terceira coluna
        return (<tr key={index}>
          <td className="table-cell"></td>
          <td className="table-cell"></td>
          <td className="table-cell" id={index} draggable={true} >{value.name}</td>
        </tr>)
      }
      return <></>
    })
  }

  return (
    <div className="container">
      <nav className="nav-bar">
        <div className="container-nav-bar-logo" onClick={() => window.location.href = "/Leads"}> {/* Ao clicar no logo, redireciona para a página de manutenção de leads */}
          <img src={egIMG} className="img-elogroup" alt="EloGroup" />
        </div>
        <div className="container-nav-bar-txt-welcome">
          <h1 className="nav-bar-txt-welcome"> Bem vindo(a) {`${user.toUpperCase()}!`} </h1>
        </div>
        <div className="container-nav-bar-btn">
          <button onClick={() => window.location.href = "/newLead"} className="nav-bar-btn">Novo Lead (+)</button>
        </div>
        <div className="container-nav-bar-btn">
          <button onClick={exitHandler} className="nav-bar-btn">Sair</button> {/* Função manipuladora que é acionada ao clicar no botão "Sair" */}
        </div>
      </nav>
      <div className="container-nav-bar">
        <div className="wrapper-login-white">
          <h1 className="login-form-title-dark"> Manutenção de Leads </h1>
          <table className="table">
            <thead className="table">
              <tr className="table">
                <th className="table-header-txt">Cliente em Potencial</th>
                <th className="table-header-txt">Dados Confirmados</th>
                <th className="table-header-txt">Reunião Agendada</th>
              </tr>
            </thead>
            <tbody>
              {
                leadSearch() // Função que busca os leads cadastrados no localStorage
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leads;