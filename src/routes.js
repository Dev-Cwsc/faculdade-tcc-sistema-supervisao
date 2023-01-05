/**
 * Componente responsável por estabelecer as rotas do app.
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationCheck from "./controller/AuthenticationController";

import Login from "./views/pages/Login"
import NewUser from "./views/pages/NewUser"
import Leads from "./views/pages/Leads"
import NewLead from "./views/pages/NewLead"

const AppRoutes = () => {
  return (
    <Router>
      <Routes> {/* A partir da versão 6 do react router não é mais necessário usar o componente "Switch" para garantir que apenas uma página seja renderizada por vez */}
        <Route path="/" element={<Login />} /> {/* "/" é o caminho padrão, ou seja, a página de login será renderizada quando acessar a URL "/" */}
        <Route path="/newUser" element={<NewUser />} />
        <Route element={<AuthenticationCheck />}> {/* Os componentes "Leads" e "NewLead" só serão renderizados se o usuário estiver autenticado */}
          <Route path="/leads" element={<Leads />} />
          <Route path="/newLead" element={<NewLead />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
