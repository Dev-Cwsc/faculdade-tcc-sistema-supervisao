import React from 'react'
import StorageManager from "../../services/StorageManager";
import "../styles/Navbar.css"
import NavBtn from './NavBtn';

const Navbar = () => {
    const user = StorageManager.getLoggedUser(); // Pega o usuário logado

    const exitHandler = () => { // Função manipuladora que é acionada ao clicar no botão "Sair"
        StorageManager.clearAuthenticationSS(); // Limpa o armazenamento de autenticação
    }

    const getPathLocation = () => { // Retorna o caminho atual
        let location = window.location.pathname;
        return location;
    }

    return (
        <nav className="navbar">
            <img src={process.env.PUBLIC_URL + '/images/ifmg-completa.png'} onClick={() => window.open("https://www.bambui.ifmg.edu.br/portal/", "_blank").focus()} alt="IFMG" /> {/* Ao clicar abre a página do IFMG - Campus Bambuí */}
            <ul>
                <h1> Bem vindo(a) ao Sistema de Monitoramento de Cargas, {`${user.toUpperCase()}!`} </h1> {/**() => window.location.href = getWindowLocation() === "http://localhost:3000/monitor" ? "newDevice" : "/monitor" */}
                <NavBtn
                    to={getPathLocation() === "/monitor" ? "/newDevice" : "/monitor"}
                    name="nav-redirect-btn"
                    btnLabel={getPathLocation() === "/monitor" ? "Novo Dispositivo" : "Cancelar"}
                />
                
                <NavBtn
                    to="/"
                    onClick={exitHandler}
                    name="nav-exit-btn"
                    btnLabel={"Sair"}
                />
            </ul>
        </nav>
    )
}

export default Navbar