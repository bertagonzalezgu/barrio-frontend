# language: es
Característica: Coordinar un intercambio por chat interno
  Como usuario con un intercambio propuesto
  Quiero coordinar fecha y hora por chat interno
  Para no tener que dar mi número de teléfono a un desconocido

  Escenario: Enviar y recibir mensajes dentro del chat de un intercambio
    Dado que tengo un intercambio propuesto con otro usuario
    Cuando abro el chat asociado a esa propuesta
    Y escribo un mensaje proponiendo fecha y hora
    Entonces el mensaje se guarda
    Y el otro usuario puede verlo al abrir el mismo chat

  Escenario: El teléfono no se comparte por defecto
    Dado que estoy chateando con otro usuario dentro de la app
    Cuando reviso la conversación y el perfil del otro usuario
    Entonces mi número de teléfono no es visible para él en ningún momento del flujo

  Escenario: Denunciar una conversación
    Dado que estoy en un chat con otro usuario
    Cuando pulso el botón "Denunciar"
    Entonces se registra una denuncia asociada a esa conversación
    Y el chat sigue siendo accesible para que el equipo de revisión pueda consultarlo

  Escenario: El chat solo es visible para las dos personas implicadas
    Dado que existe un chat entre el usuario A y el usuario B
    Cuando un tercer usuario intenta acceder a esa conversación por su identificador
    Entonces no puede ver los mensajes de esa conversación
