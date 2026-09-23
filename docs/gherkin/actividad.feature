# language: es
Característica: Ver actividad y estadísticas personales
  Como usuario
  Quiero ver cuántas horas he compartido y mi impacto en la comunidad
  Para sentir que mi participación tiene valor real

  Escenario: Ver el resumen de horas compartidas
    Dado que he completado varios intercambios
    Cuando abro la pantalla "Actividad"
    Entonces veo el total de horas compartidas y el número de veces que he ayudado

  Escenario: Los datos reflejan las transacciones reales
    Dado que se acaba de confirmar un nuevo intercambio mío
    Cuando vuelvo a abrir "Actividad"
    Entonces el total de horas compartidas incluye ese intercambio

  Escenario: Ver logros desbloqueados
    Dado que he superado 10 horas compartidas
    Cuando abro la pantalla "Actividad"
    Entonces veo el logro "Manos a la obra" marcado como conseguido
