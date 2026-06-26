Feature: Gestión de Contactos

  Scenario: Creación exitosa de un nuevo contacto
    Given que el usuario está logueado con "Wil.qa@prueba.com" y "Password123"
    When el usuario hace clic en el botón de agregar contacto
    And diligencia el formulario con el nombre "Alex" y apellido "Parra"
    Then el sistema guarda el contacto y regresa a la lista

  Scenario: Actualizar el apellido de un contacto existente
    Given que el usuario está logueado con "Wil.qa@prueba.com" y "Password123"
    When el usuario selecciona el contacto "Alex Parra"
    And modifica el apellido por "Rubio"
    Then el sistema regresa a la lista mostrando el nuevo apellido "Rubio"

  Scenario: Eliminar un contacto de la lista
    Given que el usuario está logueado con "Wil.qa@prueba.com" y "Password123"
    When el usuario selecciona el contacto "Alex Rubio"
    And decide eliminar el contacto
    Then el contacto ya no debe aparecer en la lista