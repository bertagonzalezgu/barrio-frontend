# language: es
Característica: Denunciar contenido y suspender cuentas reincidentes
  Como usuario
  Quiero poder denunciar una tarjeta o un perfil
  Para proteger a la comunidad

  Escenario: Denunciar una tarjeta
    Dado que veo una tarjeta que considero inapropiada
    Cuando pulso "Denunciar" y confirmo el motivo
    Entonces se registra la denuncia
    Y la tarjeta deja de ser visible hasta revisión manual

  Escenario: Tres denuncias verificadas suspenden la cuenta
    Dado que un usuario acumula 3 denuncias marcadas como "verificadas" por el equipo
    Cuando se registra la tercera
    Entonces la cuenta de ese usuario pasa a estado "suspendida"

  Escenario: Una denuncia no procedente no penaliza
    Dado que una denuncia ha sido revisada y marcada como "no procedente"
    Cuando se cierra la revisión
    Entonces no cuenta para la suspensión de la cuenta
