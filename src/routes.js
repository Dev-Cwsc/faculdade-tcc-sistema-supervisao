/**
 * Componente responsável por estabelecer as rotas do app.
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationCheck from "./controller/AuthenticationController";

import Login from "./views/pages/Login";
import NewUser from "./views/pages/NewUser";
import Monitor from "./views/pages/Monitor";
import NewDevice from "./views/pages/NewDevice";
import Devices from "./views/pages/Devices";
import Device from "./views/components/Device";
import Options from "./views/pages/Options";
import About from "./views/pages/About";
import DeleteDevice from "./views/pages/DeleteDevice";

const AppRoutes = () => {
  return (
    <Router>
      <Routes> {/* A partir da versão 6 do react router não é mais necessário usar o componente "Switch" para garantir que apenas uma página seja renderizada por vez */}
        <Route path="/" element={<Login />} /> {/* "/" é o caminho padrão, ou seja, a página de login será renderizada quando acessar a URL "/" */}
        <Route element={<AuthenticationCheck />}> {/* Os componentes dentro dessa rota só serão renderizados se o usuário estiver autenticado */}
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/newDevice" element={<NewDevice />} />
          <Route path="/deleteDevice" element={<DeleteDevice />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/device" element={<Device />} />
          <Route path="/about" element={<About />} />
          <Route path="/options" element={<Options />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
