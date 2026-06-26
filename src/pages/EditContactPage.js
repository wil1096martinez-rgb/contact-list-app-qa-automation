class EditContactPage {
    constructor(page) {
        this.page = page;
        this.lastNameInput = page.locator('#lastName');
        this.submitButton = page.locator('#submit');
    }

    async updateLastName(newLastName) {
        await this.lastNameInput.waitFor({ state: 'visible' });
        await this.lastNameInput.fill(newLastName);
        await this.submitButton.click();
    }
}

module.exports = { EditContactPage };