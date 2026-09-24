# language: es
Característica: Cambiar entre modo claro y oscuro
  Como usuario
  Quiero cambiar entre modo claro y oscuro
  Para adaptar la app a mis preferencias visuales

  Escenario: Cambiar de tema con el interruptor
    Dado que la app está en modo claro
    Cuando pulso el interruptor de tema
    Entonces la interfaz cambia a la paleta de modo oscuro

  Escenario: El tema elegido persiste
    Dado que he cambiado a modo oscuro
    Cuando cierro y vuelvo a abrir la app
    Entonces la app se muestra en modo oscuro sin que tenga que volver a cambiarlo
