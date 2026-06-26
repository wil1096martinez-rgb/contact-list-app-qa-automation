Feature: Autenticación de la Aplicación

  Scenario: Login exitoso con credenciales validas
    Given que el usuario navega a la pagina de login
    When ingresa el correo "Wil.qa@prueba.com" y la contraseña "Password123"
    Then el sistema debe mostrar la lista de contactos