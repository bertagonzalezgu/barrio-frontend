# language: es
Característica: Ver mis conversaciones en un solo sitio
  Como usuario con intercambios en marcha
  Quiero ver todas mis conversaciones en una lista
  Para volver a cualquier chat sin tener que recordar su enlace

  Escenario: Acceder a la lista desde la navegación
    Dado que he iniciado sesión
    Cuando pulso "Chats" en la navegación
    Entonces veo la pantalla con la lista de mis conversaciones

  Escenario: Ver los datos de cada conversación
    Dado que tengo un intercambio con otra persona sobre una tarjeta
    Cuando abro la lista de chats
    Entonces veo el nombre de la otra persona, el título de la tarjeta, las horas y el estado del intercambio

  Escenario: Ver el último mensaje de cada conversación
    Dado que tengo una conversación con mensajes
    Cuando abro la lista de chats
    Entonces veo un adelanto del último mensaje y su hora

  Escenario: Las conversaciones en curso aparecen antes que las cerradas
    Dado que tengo un intercambio aceptado y otro ya confirmado
    Cuando abro la lista de chats
    Entonces el intercambio aceptado aparece en "En curso"
    Y el intercambio confirmado aparece en "Cerrados"

  Escenario: Llegar a una propuesta recibida
    Dado que otra persona ha propuesto un intercambio sobre una tarjeta mía
    Cuando abro la lista de chats
    Entonces veo esa conversación con el estado "Propuesta"
    Y al abrirla puedo aceptar o rechazar la propuesta

  Escenario: Abrir una conversación desde la lista
    Dado que veo una conversación en la lista
    Cuando pulso sobre ella
    Entonces se abre el chat de ese intercambio

  Escenario: Todavía no tengo conversaciones
    Dado que no tengo ningún intercambio
    Cuando abro la lista de chats
    Entonces veo un mensaje indicando que todavía no tengo conversaciones