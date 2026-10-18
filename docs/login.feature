# language: es
Característica: Iniciar sesión y registro con Firebase
  Como usuario
  Quiero iniciar sesión o registrarme con Firebase
  Para acceder de forma segura a mi cuenta

  Escenario: Registro con datos válidos
    Dado que no tengo cuenta
    Cuando me registro con un email y contraseña válidos
    Entonces mi cuenta se crea y accedo directamente a la pantalla de Inicio

  Escenario: Login con credenciales incorrectas
    Dado que ya tengo cuenta
    Cuando intento iniciar sesión con una contraseña incorrecta
    Entonces veo un mensaje de error y no accedo a la app

  Escenario: Acceso a una ruta protegida sin sesión iniciada
    Dado que no he iniciado sesión
    Cuando intento acceder directamente a una URL de una pantalla protegida (por ejemplo, "Perfil")
    Entonces se me redirige a la pantalla de login
