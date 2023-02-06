/**
 * Classe responsável por gerenciar o armazenamento de dados.
 */
import axios from "axios";

class StorageManager {

    static async getJSONServerData(key) {
        const URL = "http://localhost:5000/" + key;
        const DATA = await axios.get(URL).then(response => response.data)
            .catch(error => {
                console.error(error);
            });
        return DATA;
    }

    static async setJSONServerData(key, data) {
        const URL = "http://localhost:5000/" + key;
        await axios.post(URL,
            data
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    static async getUserFromDB(login, password) { // Retorna o usuário com o login e senha especificados, ou false caso contrário
        const USERS = await this.getJSONServerData("users");
        return JSON.stringify(USERS) === "[]" ? false : USERS.find(object => object.login === login && object.password === password);
    }

    static async registerUser(login, password) {
        const USERS = await this.getJSONServerData("users");
        if (JSON.stringify(USERS) !== "[]") {
            if (USERS.find(object => object.login === login)) {
                alert("Já existe um usuário cadastrado com esse login.");
                return false;
            }
        }
        await this.setJSONServerData("users", { "id": 0, "login": login, "password": password });
        return true;
    }

    static async registerDevice(id, name, installation){
        const DEVICES = await this.getJSONServerData("devices");
        if (DEVICES.find(object => object.id === id)) {
            alert("Já existe um dispositivo cadastrado com esse id.");
            return false;
        }
        await this.setJSONServerData("devices", { "id": id, "device_name": name, "installation_name": installation });
        return true;
    }

    static async setAuthenticationSS(login, password) {
        const USER = await this.getUserFromDB(login, password); // Busca o usuário no banco de dados. Se não encontrou retorna false, se encotrou retorna o objeto
        if (USER) { // Se o usuário existir, ele será armazenado no sessionStorage
            sessionStorage.setItem("authenticated", JSON.stringify(login));
            return true; // Retorna true para confirmar que o usuário foi autenticado
        }
        return false; // Retorna false se o usuário não existir no banco de dados
    }

    static getAuthenticationSS() {
        return JSON.parse(sessionStorage.getItem("authenticated")) ? true : false; // Retorna true se houver um usuário estiver autenticado no momento, false caso contrário
    }

    static clearAuthenticationSS() {
        sessionStorage.clear(); // Limpa o sessionStorage
    }

    static getLoggedUser() {
        return JSON.parse(sessionStorage.getItem("authenticated")); // Retorna o login do usuário autenticado
    }
}

export default StorageManager;