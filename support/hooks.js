const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Aumento el timeout global de Cucumber a 30 segundos (30000 milisegundos)
setDefaultTimeout(30000);

let browser;

// Se ejecuta una sola vez antes de todas las pruebas
BeforeAll(async function () {
    browser = await chromium.launch({ 
        headless: false, // Cambia a true si no quieres ver el navegador abrirse
        slowMo: 500      // Pausa opcional de 500ms entre acciones para poder ver la demo visualmente
    });
});

// Se ejecuta antes de CADA escenario
Before(async function () {
    // Creamos un entorno aislado (contexto) y una nueva pestaña (page)
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

// Se ejecuta después de CADA escenario
After(async function () {
    // Cerramos la pestaña y el contexto para limpiar cookies/sesiones
    await this.page.close();
    await this.context.close();
});

// Se ejecuta una sola vez al finalizar todo el set de pruebas
AfterAll(async function () {
    await browser.close();
});