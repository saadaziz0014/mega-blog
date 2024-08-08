import { Client, Account, ID } from 'appwrite'
import constants from '../config/constant';

class Auth {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(constants.appwriteEndPoint).setProject(constants.appwriteProject);
        this.account = new Account(this.client);
    }

    async register({ name, email, password }) {
        try {
            let data = await this.account.create(ID.unique(), email, password, name);
            if (data) {
                return this.login({ email, password });
            } else {
                throw data;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            let data = await this.account.createEmailSession(email, password);
            if (data) {
                return data;
            } else {
                throw data;
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            let data = await this.account.deleteSessions();
            if (data) {
                return data;
            } else {
                throw data;
            }
        } catch (error) {
            throw error;
        }
    }

    async checkSession() {
        try {
            let data = await this.account.get();
            if (data) {
                return data;
            } else {
                throw data;
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}

const auth = new Auth();
export default auth