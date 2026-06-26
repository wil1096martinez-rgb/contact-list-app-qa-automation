/*@Autor William Martinez*/

const { request } = require('@playwright/test');

class ContactApiClient {
    constructor() {
        this.baseURL = 'https://thinking-tester-contact-list.herokuapp.com';
        this.token = '';
    }

    async login(email, password) {
        const context = await request.newContext();
        const response = await context.post(`${this.baseURL}/users/login`, {
            data: { email, password }
        });
        const body = await response.json();
        this.token = body.token;
        return response.status();
    }

    async createContact(firstName, lastName) {
        const context = await request.newContext();
        const response = await context.post(`${this.baseURL}/contacts`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            data: { firstName, lastName }
        });
        return { status: response.status(), body: await response.json() };
    }

    // NUEVO MÉTODO: Leer contacto por ID (GET)
    async getContactById(id) {
        const context = await request.newContext();
        const response = await context.get(`${this.baseURL}/contacts/${id}`, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return { status: response.status(), body: await response.json() };
    }

    // Versión ultra-blindada para el PUT
    async updateContact(id, firstName, lastName) {
        const context = await request.newContext();
        const response = await context.put(`${this.baseURL}/contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Le aclaramos que esperamos un JSON de vuelta
            },
            data: {
                firstName: firstName,
                lastName: lastName
            }
        });
        return { status: response.status(), body: await response.json() };
    }

    // Versión ultra-blindada para el DELETE
    async deleteContact(id) {
        const context = await request.newContext();
        const response = await context.delete(`${this.baseURL}/contacts/${id}`, {
            headers: { 
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json'
            }
        });
        return response.status();
    }
}

module.exports = { ContactApiClient };