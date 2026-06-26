const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { ContactApiClient } = require('../../src/api/ContactApiClient');

let apiClient = new ContactApiClient();
let apiResponse;
let contactId; // Variable estratégica para almacenar el ID del contacto dinámicamente

Given('que el usuario se autentica en la API con el correo {string} y la contraseña {string}', async function (email, password) {
    const statusCode = await apiClient.login(email, password);
    expect(statusCode).to.equal(200);
});

When('envia una peticion POST para crear un contacto con nombre {string} y apellido {string}', async function (firstName, lastName) {
    apiResponse = await apiClient.createContact(firstName, lastName);
});

Then('la API debe responder con un codigo de estado {int}', async function (expectedStatus) {
    if (apiResponse.status !== expectedStatus) {
        console.log("\n👇 ❌ DETALLE DEL STATUS ERROR:");
        console.log(JSON.stringify(apiResponse.body, null, 2));
    }
    expect(apiResponse.status).to.equal(expectedStatus);
});

Then('la respuesta debe contener los datos del contacto creado', async function () {
    expect(apiResponse.body).to.have.property('_id');
    expect(apiResponse.body.firstName).to.equal('Alex');
    expect(apiResponse.body.lastName).to.equal('REST');
    
    // GUARDAMOS EL ID DEL CONTACTO PARA EL RESTO DEL CRUD
    contactId = apiResponse.body._id;
});

// ================= PASOS DE LECTURA (GET) =================

When('envia una peticion GET para consultar el contacto creado', async function () {
    apiResponse = await apiClient.getContactById(contactId);
});

Then('la respuesta debe confirmar que el nombre es {string}', async function (expectedName) {
    expect(apiResponse.body.firstName).to.equal(expectedName);
});

// ================= PASOS DE ACTUALIZACIÓN (PUT) =================

When('envia una peticion PUT para actualizar el apellido por {string}', async function (newLastName) {
    // Mantenemos el nombre "Alex" pero enviamos el nuevo apellido
    apiResponse = await apiClient.updateContact(contactId, 'Alex', newLastName);
});

// ================= PASOS DE ELIMINACIÓN (DELETE) =================

When('envia una peticion DELETE para eliminar el contacto creado', async function () {
    const statusCode = await apiClient.deleteContact(contactId);
    // Asignamos la estructura esperada por el validador de status code genérico
    apiResponse = { status: statusCode };
});