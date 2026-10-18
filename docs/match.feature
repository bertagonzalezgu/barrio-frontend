# language: es
Característica: Proponer un intercambio directamente desde una tarjeta
  Como persona que ofrece ayuda con mudanzas
  Quiero proponer un intercambio directamente desde una necesidad publicada
  Para no tener que esperar a que me contacten

  Escenario: Proponer intercambio desde el detalle de una tarjeta de "busco"
    Dado que veo el detalle de una tarjeta de tipo "busco" publicada por otra persona
    Cuando pulso "Proponer intercambio"
    Entonces se crea una propuesta de intercambio asociada a esa tarjeta
    Y se abre un chat entre ambos usuarios para coordinar

  Escenario: No se puede proponer intercambio a la propia tarjeta
    Dado que soy el autor de una tarjeta de "busco"
    Cuando visito el detalle de mi propia tarjeta
    Entonces no veo el botón "Proponer intercambio"

  Escenario: Ver el estado de una propuesta enviada
    Dado que he propuesto un intercambio sobre una tarjeta
    Y la otra persona todavía no ha respondido
    Cuando vuelvo a abrir el detalle de esa tarjeta
    Entonces veo el estado "Propuesta enviada"

  Escenario: No se puede proponer un segundo intercambio sobre la misma tarjeta ya aceptada
    Dado que una tarjeta ya tiene un intercambio aceptado con otra persona
    Cuando intento pulsar "Proponer intercambio" sobre esa misma tarjeta
    Entonces no puedo enviar una nueva propuesta
    Y veo un aviso de que la tarjeta ya no está disponible
