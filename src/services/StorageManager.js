/**
 * Classe responsável por gerenciar o armazenamento de dados.
 */
import axios from "axios";

const API = axios.create({
    baseURL: "/api",
});

class StorageManager {

    static async getData(path) {
        const DATA = await API.get(path).then(response => response.data)
            .catch(error => {
                console.error(error.message);
            });
        return DATA;
    }

    static async setData(path, data) {
        await API.post(path, data).then(response => {
            console.log("Status code: " + response.status + ", Status text: " + response.statusText);
        })
            .catch(error => {
                console.error(error.message);
            });
    }

    static async deleteData(path, key) {
        return await API.delete(path + "/" + key).then(response => {
            console.log("Status code: " + response.status + ", Status text: " + response.statusText);
            return true;
        })
            .catch(error => {
                console.error(error.message);
                return false;
            });
    }

    static async getUserFromDB(login, password) { // Retorna o usuário com o login e senha especificados, ou false caso contrário
        const USERS = await this.getData("/user");
        return JSON.stringify(USERS) === "[]" ? false : USERS.find(object => object.userLogin === login && object.userPassword === password);
    }

    static async registerUser(login, password) {
        const USERS = await this.getData("/user");
        if (JSON.stringify(USERS) !== "[]") {
            if (USERS.find(object => object.userLogin === login)) {
                alert("Já existe um usuário cadastrado com esse login.");
                return false;
            }
        }
        await this.setData("/user", {
            "userLogin": login,
            "userPassword": password
        });
        return true;
    }

    static async registerDevice(name, installation) {
        await this.setData("/device", { // Registra o dispositivo na lista de dispositivos
            "device": name,
            "installation": installation
        });
        return true;
    }

    static async getDevices() {
        const DEVICES = await this.getData("/device");
        return DEVICES;
    }

    static async deleteDevice(key) {
        if (window.confirm("Realmente deseja excluir o dispositivo? Esta ação não poderá ser desfeita.")) {
            return await this.deleteData("/device", key);
        }
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