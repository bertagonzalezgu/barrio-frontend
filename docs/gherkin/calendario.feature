# language: es
Característica: Ver y gestionar fechas en el calendario
  Como usuario
  Quiero ver en un calendario las fechas de mis necesidades y disponibilidades
  Para organizar mi tiempo sin revisar cada tarjeta una a una

  Escenario: Ver los días marcados según busco/ofrezco
    Dado que tengo tarjetas con fechas asociadas
    Cuando abro la pantalla "Calendario"
    Entonces los días con una tarjeta de tipo "busco" muestran un indicador distinto al de "ofrezco"

  Escenario: Añadir disponibilidad desde el calendario
    Dado que estoy en la pantalla "Calendario"
    Cuando pulso "Añadir disponibilidad" y relleno categoría, horas y fecha
    Entonces se crea una tarjeta de tipo "ofrezco" con esa fecha
    Y el día correspondiente queda marcado en el calendario

  Escenario: Filtrar el calendario por categoría
    Dado que tengo tarjetas de varias categorías con fecha
    Cuando filtro el calendario por la categoría "Hogar"
    Entonces solo se marcan los días con tarjetas de esa categoría

  Escenario: Seleccionar un día muestra sus tarjetas
    Dado que un día del calendario tiene una o más tarjetas asociadas
    Cuando pulso sobre ese día
    Entonces veo el listado de tarjetas de esa fecha
