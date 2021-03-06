'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class PoiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getPOIs() {
        const response = await axios.get(this.baseUrl + '/api/pois');
        return response.data;
    }

    async getPOI(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/pois/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createPOI(newPOI) {
        const response = await axios.post(this.baseUrl + '/api/pois', newPOI);
        return response.data;
    }

    async deleteAllPOIs() {
        const response = await axios.delete(this.baseUrl + '/api/pois');
        return response.data;
    }

    async deleteOnePOI(id) {
        const response = await axios.delete(this.baseUrl + '/api/pois/' + id);
        return response.data;
    }

    async getUsers() {
        const response = await axios.get(this.baseUrl + '/api/users');
        return response.data;
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/user/' + id);
            return response.data;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        const response = await axios.post(this.baseUrl + '/api/users', newUser);
        return response.data;
    }

    async authenticate(user) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async clearAuth(user) {
        axios.defaults.headers.common['Authorization'] = '';
    }
}

module.exports = PoiService;