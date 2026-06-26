class AddContactPage {
    constructor(page) {
        this.page = page;
        // Localizadores del formulario
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.submitButton = page.locator('#submit');
    }

    async fillBasicContactDetails(firstName, lastName) {
        // Esperamos a que el campo de nombre esté listo antes de escribir
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.submitButton.click();
    }
}

module.exports = { AddContactPage };