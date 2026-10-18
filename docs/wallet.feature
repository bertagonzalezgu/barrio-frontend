# language: es
Característica: Créditos de bienvenida al registrarse
  Como usuaria nueva
  Quiero recibir 2 horas de regalo al registrarme
  Para poder pedir mi primera ayuda

  Escenario: Recibir horas de regalo al completar el registro
    Dado que soy una usuaria nueva y no tengo cuenta todavía
    Cuando completo el registro con email y contraseña (o proveedor de Firebase)
    Entonces mi cuenta se crea con un saldo inicial de 2 horas
    Y puedo ver ese saldo en la pantalla de Inicio

  Escenario: Usar las horas de regalo para pedir la primera ayuda
    Dado que tengo un saldo de 2 horas de regalo y no he ofrecido nada todavía
    Cuando propongo un intercambio que cuesta 1 hora
    Entonces la propuesta se acepta sin bloquearse por falta de saldo
    Y al confirmarse el intercambio mi saldo se actualiza a 1 hora

  Escenario: Saldo insuficiente para un intercambio
    Dado que tengo un saldo de 1 hora
    Cuando intento proponer un intercambio que cuesta 3 horas
    Entonces veo un aviso de que no tengo saldo suficiente
    Y no se crea la propuesta de intercambio

  Escenario: Las horas de regalo no se duplican
    Dado que ya recibí mis 2 horas de regalo al registrarme
    Cuando cierro sesión y vuelvo a iniciar sesión más tarde
    Entonces no se añaden horas de regalo adicionales a mi saldo
