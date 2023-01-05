/**
 * Classe responsável por gerenciar o armazenamento de dados.
 */

class StorageManager {
    static userExists (login){
        const users = this.getDataLS("users");
        if(users===null){
            window.alert("Ainda não há usuários cadastrados."); // Se não existirem usuários cadastrados no localStorage, o usuário será avisado
            return false;
        } else {
            return users.find(object => object.login === login) ? true : false; // Retorna true se encontrar um usuário com o login especificado, false caso contrário
        }
    }

    static getUserLS (login, password) { // Retorna o usuário com o login e senha especificados, ou false caso contrário
        const users = this.getDataLS("users");
        return this.userExists(login) ? users.find(object => object.login === login && object.password === password) : false;
    }
    
    static getDataLS (key) {
        const data = JSON.parse(localStorage.getItem(key)); // JSON.parse interpreta o JSON e transforma em objeto
        return data;
    }

    static setUserLS (login, password) {
        let users = [];
        if (this.getDataLS("users")) { // Se já existirem usuários cadastrados no localSotrage, eles serão armazenados em um array
            users = this.getDataLS("users");
            if(this.userExists(login)) { // Se o login já existir, significa que o usuário já está cadastrado
                alert("Já existe um usuário cadastrado com esse login.");
                return false;
            }
        }
        users.push({"login": login, "password": password});
        localStorage.setItem("users", JSON.stringify(users)); // JSON.stringfy converte o objeto em string
        return true;
    }

    static setLeadsLS (leadName, phone, email, rpa, digitalProduct, analytics, bpm) {
        let leads = [];
        if (this.getDataLS("leads")) { // Se já existirem leads cadastrados no localSotrage, eles serão armazenados em um array
            leads = this.getDataLS("leads");
        }
        leads.push({"name": leadName, "phone": phone, "email": email, "oportunities": rpa, digitalProduct, analytics, bpm, "status": "Cliente em potencial"});
        localStorage.setItem("leads", JSON.stringify(leads));
        return true;
    }

    static getLeadsLS () { // Retorna todos os leads armazenados no localStorage
        const leads = this.getDataLS("leads");
        return leads;
    }

    static updateStateLeadLS (id) { // Atualiza o status do lead no localStorage
        let leads;
        if (leads = this.getDataLS("leads")){
            if(leads[id].status==="Cliente em potencial"){
                leads[id].status = "Dados confirmados";
            } else if (leads[id].status==="Dados confirmados"){
                leads[id].status = "Reunião agendada";
            }
            localStorage.setItem("leads", JSON.stringify(leads));
        }
    }

    static setAuthenticationSS (login, password) {
        const user = this.getUserLS(login, password); // Busca o usuário no localStorage
        if (user) { // Se o usuário existir, ele será armazenado no sessionStorage
            sessionStorage.setItem("authenticated", JSON.stringify(login));
            return true; // Retorna true para confirmar que o usuário foi autenticado
        }
        return false; // Retorna false se o usuário não existir no localStorage
    }

    static getAuthenticationSS () {
        return JSON.parse(sessionStorage.getItem("authenticated")) ? true : false; // Retorna true se houver um usuário estiver autenticado no momento, false caso contrário
    }

    static clearAuthenticationSS () {
        sessionStorage.clear(); // Limpa o sessionStorage
    }

    static getLoggedUser () {
        return JSON.parse(sessionStorage.getItem("authenticated")); // Retorna o login do usuário autenticado
    }
}

export default StorageManager;