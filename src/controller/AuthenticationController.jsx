/**
 * Componente de verificação responsável por restringir o acesso a páginas restritas no caso de o usuário não estar autenticado.
 */

import { Outlet } from 'react-router';
import Login from '../views/pages/Login';
import StorageManager from "../services/StorageManager";

const isAuth = () => { // Retorna o estado de autenticação
    return StorageManager.getAuthenticationSS();
};

const AuthenticationCheck = () => { // Verifica se o usuário está autenticado
    return isAuth() ? <Outlet /> : <Login />; // Se estiver autenticado, retorna o componente solicitado, caso contrário, retorna o componente de login
};

export default AuthenticationCheck;