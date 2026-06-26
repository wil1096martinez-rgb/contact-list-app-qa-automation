/*@Autor William Martinez*/

class ContactDetailsPage {
    constructor(page) {
        this.page = page;
        this.editButton = page.locator('#edit-contact');
        this.deleteButton = page.locator('#delete');
    }

    async clickEdit() {
        await this.editButton.waitFor({ state: 'visible' });
        await this.editButton.click();
    }

    async clickDelete() {
        await this.deleteButton.waitFor({ state: 'visible' });
        await this.deleteButton.click();
    }
}

module.exports = { ContactDetailsPage };