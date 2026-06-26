Feature: API de Gestión de Contactos

  Background: Autenticación en la API
    Given que el usuario se autentica en la API con el correo "Wil.qa@prueba.com" y la contraseña "Password123"

  Scenario: Ciclo de vida completo de un contacto (CRUD) via API
    When envia una peticion POST para crear un contacto con nombre "Alex" y apellido "Parra"
    Then la API debe responder con un codigo de estado 201
    And la respuesta debe contener los datos del contacto creado

    When envia una peticion GET para consultar el contacto creado
    Then la API debe responder con un codigo de estado 200
    And la respuesta debe confirmar que el nombre es "Alex"

    When envia una peticion PUT para actualizar el apellido por "Rubio"
    Then la API debe responder con un codigo de estado 200

    When envia una peticion DELETE para eliminar el contacto creado
    Then la API debe responder con un codigo de estado 200