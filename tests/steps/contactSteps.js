const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { LoginPage } = require('../../src/pages/LoginPage');
const { ContactListPage } = require('../../src/pages/ContactListPage');
const { AddContactPage } = require('../../src/pages/AddContactPage');
const { ContactDetailsPage } = require('../../src/pages/ContactDetailsPage');
const { EditContactPage } = require('../../src/pages/EditContactPage');

let loginPage;
let contactListPage;
let addContactPage;
let contactDetailsPage;
let editContactPage;

Given('que el usuario está logueado con {string} y {string}', async function (email, password) {
    loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(email, password);
    contactListPage = new ContactListPage(this.page);
    await contactListPage.isAddContactButtonVisible();
});

When('el usuario hace clic en el botón de agregar contacto', async function () {
    await contactListPage.clickAddContact();
});

When('diligencia el formulario con el nombre {string} y apellido {string}', async function (firstName, lastName) {
    addContactPage = new AddContactPage(this.page);
    await addContactPage.fillBasicContactDetails(firstName, lastName);
});

Then('el sistema guarda el contacto y regresa a la lista', async function () {
    const isVisible = await contactListPage.isAddContactButtonVisible();
    expect(isVisible).to.be.true;
});

// ================= STEP DEFINITIONS PARA READ Y UPDATE =================

When('el usuario selecciona el contacto {string}', async function (contactName) {
    await contactListPage.selectContact(contactName);
    contactDetailsPage = new ContactDetailsPage(this.page);
});

When('modifica el apellido por {string}', async function (newLastName) {
    await contactDetailsPage.clickEdit();
    editContactPage = new EditContactPage(this.page);
    await editContactPage.updateLastName(newLastName);
});

Then('el sistema regresa a la lista mostrando el nuevo apellido {string}', async function (expectedLastName) {
    // Validamos que regresamos a la lista principal
    const isListVisible = await contactListPage.isAddContactButtonVisible();
    expect(isListVisible).to.be.true;
    
    // Validamos que el nuevo apellido se renderice en pantalla
    const isLastNamePresent = await contactListPage.isContactPresent(expectedLastName);
    expect(isLastNamePresent).to.be.true;
});

// ================= STEP DEFINITIONS PARA DELETE =================

When('decide eliminar el contacto', async function () {
    // Escuchador simplificado: Alerta que salga, alerta que el robot acepta inmediatamente
    this.page.once('dialog', async dialog => {
        await dialog.accept();
    });
    
    // Hacemos el clic que detona la alerta
    await contactDetailsPage.clickDelete();
});

Then('el contacto ya no debe aparecer en la lista', async function () {
    // Llamamos al nuevo método que espera a que se oculte
    const isHidden = await contactListPage.isContactHidden('Alex Rubio');
    
    // Ahora afirmamos que exitosamente se ha ocultado (esperamos que isHidden sea true)
    expect(isHidden).to.be.true;
});