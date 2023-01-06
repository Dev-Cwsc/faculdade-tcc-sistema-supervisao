import React from 'react'
import StorageManager from "../../services/StorageManager";
import ifIMG from "./ifmg-completa.png";
import "../styles/Navbar.css"

const Navbar = () => {
    const user = StorageManager.getLoggedUser(); // Pega o usuário logado

    const exitHandler = () => {
        window.location.href = "/"; // Redireciona para a página de login
        StorageManager.clearAuthenticationSS(); // Limpa o armazenamento de autenticação
    }

    return (
        <nav className="navbar">
            <img src={ifIMG} onClick={() => window.open("https://www.bambui.ifmg.edu.br/portal/", "_blank").focus()} /> {/* Ao clicar abre a página do IFMG - Campus Bambuí */}
            <ul>
                <h1> Bem vindo(a) ao Sistema de Monitoramento de Cargas, {`${user.toUpperCase()}!`} </h1>
                <button onClick={exitHandler} >Sair</button> {/* Função manipuladora que é acionada ao clicar no botão "Sair" */}
            </ul>
        </nav>
    )
}

export default Navbar