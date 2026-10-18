# language: es
Característica: Ver tarjetas activas en el mapa
  Como usuario
  Quiero ver en un mapa las tarjetas activas cerca de mí
  Para elegir intercambios según la proximidad

  Escenario: Ver tarjetas geolocalizadas en el mapa
    Dado que existen tarjetas activas con ubicación en mi zona
    Cuando abro la pantalla "Mapa"
    Entonces veo un pin por cada tarjeta activa en su posición aproximada

  Escenario: Filtrar el mapa por categoría
    Dado que estoy en la pantalla "Mapa" viendo todas las categorías
    Cuando selecciono la categoría "Digital"
    Entonces solo se muestran los pines de tarjetas de esa categoría

  Escenario: Abrir el detalle de una tarjeta desde el mapa
    Dado que veo un pin en el mapa
    Cuando pulso sobre ese pin
    Entonces se abre el detalle de la tarjeta correspondiente

  Escenario: No hay tarjetas activas en la zona
    Dado que no existe ninguna tarjeta activa con ubicación cercana
    Cuando abro la pantalla "Mapa"
    Entonces veo un mensaje indicando que no hay actividad cerca
