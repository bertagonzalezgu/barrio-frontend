# language: es
Característica: Filtrar tarjetas por categoría en el modo Buscar
  Como usuaria buscando ayuda
  Quiero filtrar por categoría
  Para encontrar rápido lo que necesito sin scrollear todo el feed

  Escenario: Filtrar el feed por una categoría
    Dado que estoy en el modo "Buscar" con la categoría "Todas" seleccionada
    Cuando selecciono la categoría "Cuidados"
    Entonces la vista muestra solo tarjetas de la categoría "Cuidados"

  Escenario: El filtro se mantiene al cambiar entre la vista de tarjetas y la de lista
    Dado que he filtrado por la categoría "Hogar" en la vista de tarjetas (swipe)
    Cuando cambio a la vista de "Lista"
    Entonces la lista muestra también solo tarjetas de la categoría "Hogar"

  Escenario: Quitar el filtro volviendo a "Todas"
    Dado que tengo activo el filtro de categoría "Digital"
    Cuando selecciono el chip "Todas"
    Entonces vuelvo a ver tarjetas de todas las categorías

  Escenario: No hay resultados para una categoría
    Dado que no existe ninguna tarjeta activa en la categoría "Comunidad"
    Cuando selecciono la categoría "Comunidad"
    Entonces veo un mensaje indicando que no hay resultados en esa categoría
