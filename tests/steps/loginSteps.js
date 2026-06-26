const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai'); // Librería para hacer aserciones/validaciones
const { LoginPage } = require('../../src/pages/LoginPage');
const { ContactListPage } = require('../../src/pages/ContactListPage');

let loginPage;
let contactListPage;

Given('que el usuario navega a la pagina de login', async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigate();
});

// El {string} captura dinámicamente lo que pusiste entre comillas en el Gherkin
When('ingresa el correo {string} y la contraseña {string}', async function (email, password) {
    await loginPage.login(email, password);
});

Then('el sistema debe mostrar la lista de contactos', async function () {
    contactListPage = new ContactListPage(this.page);
    
    // Validamos que el botón de agregar contacto sea visible
    const isVisible = await contactListPage.isAddContactButtonVisible();
    
    // Aserción (Si es false, la prueba falla automáticamente)
    expect(isVisible).to.be.true; 
});