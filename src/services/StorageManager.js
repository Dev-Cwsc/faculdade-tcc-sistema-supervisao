/**
 * Classe responsável por gerenciar o armazenamento de dados.
 */
import axios from "axios";

const HASH_DEVICES = "3885893f3c95bd153cd3deebabdd1e493d7091b216ef8c15d28ec2ae2ab64b850c1182f1eebb16cf3e4bb11625bf1e04b70f5a31030547cdcdb3eb2a2e313682";
const HASH_USERS = "bd66dd43529749d38e1eba3d52b7c49838ac5b29e03898a289ad05b4aa41fafc8eb2f952886a97c54c1b328de3a0111a7fb3c728fd116d4ede442ef20b6ce9b7";
const API = axios.create({
    baseURL: "/api",
});

class StorageManager {

    static async getJSONServerData(path) {
        const DATA = await API.get(path).then(response => response.data)
            .catch(error => {
                console.error(error.message);
            });
        return DATA;
    }

    static async setJSONServerData(path, data) {
        await API.post(path, data).then(response => {
            console.log("Status code: " + response.status + ", Status text: " + response.statusText);
        })
            .catch(error => {
                console.error(error.message);
            });
    }

    static async deleteJSONServerData(path, key) {
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
        const USERS = await this.getJSONServerData(HASH_USERS);
        return JSON.stringify(USERS) === "[]" ? false : USERS.find(object => object.login === login && object.password === password);
    }

    static async registerUser(login, password) {
        const USERS = await this.getJSONServerData(HASH_USERS);
        if (JSON.stringify(USERS) !== "[]") {
            if (USERS.find(object => object.login === login)) {
                alert("Já existe um usuário cadastrado com esse login.");
                return false;
            }
        }
        await this.setJSONServerData(HASH_USERS, { "id": 0, "login": login, "password": password });
        return true;
    }

    static async registerDevice(id, name, installation) {
        const DEVICES = await this.getJSONServerData(HASH_DEVICES);
        if (DEVICES.find(object => object.id === id)) {
            alert("Já existe um dispositivo cadastrado com esse id.");
            return false;
        }
        await this.setJSONServerData(HASH_DEVICES, { // Registra o dispositivo na lista de dispositivos
            "id": id,
            "device_name": name,
            "installation_name": installation,
            "measurement_ch1": 0,
            "measurement_ch2": 0,
            "last_update": new Date()
        });
        return true;
    }

    static async getDevices() {
        const DEVICES = await this.getJSONServerData(HASH_DEVICES);
        return DEVICES;
    }

    static async deleteDevice(key) {
        if (window.confirm("Realmente deseja excluir o dispositivo? Esta ação não poderá ser desfeita.")) {
            return await this.deleteJSONServerData(HASH_DEVICES, key);
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