class ContactListPage {
    constructor(page) {
        this.page = page;
        this.addContactButton = page.locator('#add-contact');
    }

    async isAddContactButtonVisible() {
        await this.addContactButton.waitFor({ state: 'visible', timeout: 15000 });
        return await this.addContactButton.isVisible();
    }

    async clickAddContact() {
        await this.addContactButton.click();
    }

    async selectContact(contactName) {
        const contactRow = this.page.locator(`text="${contactName}"`).first();
        // Agregamos un timeout explícito de 15 segundos para dar tiempo a que cargue la tabla
        await contactRow.waitFor({ state: 'visible', timeout: 15000 });
        await contactRow.click();
    }

    async isContactPresent(contactName) {
        const contactRow = this.page.locator(`text="${contactName}"`).first();
        try {
            // Esperamos a que aparezca en la tabla de forma asíncrona antes de cantar victoria o derrota
            await contactRow.waitFor({ state: 'visible', timeout: 15000 });
            return await contactRow.isVisible();
        } catch (error) {
            // Si pasaron 15 segundos y nunca apareció, retornamos false de forma segura sin romper el código
            return false;
        }
    }

    async isContactHidden(contactName) {
    const contactRow = this.page.locator(`text="${contactName}"`).first();
        try {
        // Playwright esperará inteligentemente hasta 15 segundos a que el elemento DESAPAREZCA de la pantalla
        await contactRow.waitFor({ state: 'hidden', timeout: 15000 });
        return true; // Si se oculta con éxito, devuelve true
        } catch (error) {
        return false; // Si pasaron 15 segundos y sigue ahí, devuelve false
        }
    }
}

module.exports = { ContactListPage };