# Reto Técnico QA Automation - Contact List App

Este proyecto contiene la automatización del flujo de pruebas End-to-End (E2E) para la aplicación de gestión de contactos, cubriendo las operaciones CRUD completas tanto a nivel de Interfaz de Usuario (UI) como en la capa de Servicios (API REST).

## 🚀 Stack Tecnológico
* **Lenguaje:** JavaScript (Node.js)
* **Framework de Automatización:** Playwright
* **Framework BDD:** @cucumber/cucumber (Gherkin)
* **Librería de Aserciones:** Chai

## 📂 Estructura y Arquitectura del Proyecto
El proyecto aplica el patrón **Page Object Model (POM)** para modularizar las pantallas de la UI y **Service Objects** para desacoplar el consumo de la API REST, garantizando un código limpio, escalable y mantenible bajo principios SOLID y DRY.

```text
├── docs/
│   └── Pruebas UI-API.xlsx                # Plan de pruebas y Reporte de Defects (Bugs)
├── src/
│   ├── api/
│   │   └── ContactApiClient.js            # Cliente HTTP para el CRUD de la API
│   └── pages/
│       ├── ContactDetailsPage.js          # POM: Pantalla de detalle del contacto
│       ├── ContactListPage.js             # POM: Lista de contactos y esperas dinámicas
│       └── LoginPage.js                   # POM: Formulario de autenticación
├── tests/
│   ├── features/
│   │   ├── api_contact.feature            # Escenarios BDD para servicios REST
│   │   └── contact.feature                # Escenarios BDD para la interfaz web
│   └── steps/
│       ├── apiContactSteps.js             # Definición de pasos funcionales de API
│       └── contactSteps.js                # Definición de pasos funcionales de UI
├── .gitignore                             # Exclusión de node_modules y reportes locales
├── cucumber.json                          # Configuración del orquestador de pruebas
├── package.json                           # Gestión de dependencias y scripts de Node
└── README.md                              # Documentación técnica del framework

## 🛠️ Instalación y Requisitos
Asegúrate de tener instalado [Node.js (LTS)](https://nodejs.org/).

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install

