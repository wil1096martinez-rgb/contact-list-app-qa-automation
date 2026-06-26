class LoginPage {
    // El constructor recibe la "página" (pestaña) que Playwright abrió
    constructor(page) {
        this.page = page;
        
        // Mapeo de Locators (Elementos web)
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#submit');
    }

    // Método para navegar a la URL
    async navigate() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    }

    // Método para hacer login (lo usaremos más adelante)
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}

// Exportamos la clase para poder usarla en nuestros steps
module.exports = { LoginPage };