# language: es
Característica: Valorar a la otra persona al terminar un intercambio
  Como usuario
  Quiero valorar a la otra persona al terminar el intercambio
  Para que el resto de la comunidad sepa si es de fiar

  Escenario: Valorar tras confirmar un intercambio
    Dado que un intercambio ha sido confirmado por ambas partes
    Cuando pulso "Confirmar intercambio" en el chat
    Entonces se me pide valorar a la otra persona con una puntuación y un comentario opcional
    Y esa valoración se guarda asociada a su perfil

  Escenario: La valoración es visible en el perfil público
    Dado que he valorado a otra persona tras un intercambio
    Cuando visito el perfil de esa persona
    Entonces veo su valoración media actualizada y el número total de intercambios

  Escenario: No se puede valorar un intercambio sin confirmar
    Dado que un intercambio todavía no se ha confirmado por ambas partes
    Cuando intento acceder a la pantalla de valoración de ese intercambio
    Entonces no puedo enviar ninguna valoración

  Escenario: No se puede valorar dos veces el mismo intercambio
    Dado que ya he valorado un intercambio confirmado
    Cuando vuelvo a la pantalla de ese intercambio
    Entonces no veo la opción de valorar de nuevo, solo la valoración que ya di
