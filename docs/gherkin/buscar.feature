# language: es
Característica: Publicar una necesidad de ayuda (Buscar)
  Como usuaria que se va de viaje
  Quiero publicar que necesito a alguien que riegue mis plantas 5 días
  Para no tener que pedírselo a un familiar lejano

  Escenario: Publicar una tarjeta de "busco" con éxito
    Dado que he iniciado sesión
    Y estoy en la pantalla "Crear tarjeta" en modo "Busco"
    Cuando relleno la categoría "Cuidados", la descripción "Necesito que alguien riegue mis plantas 5 días" y las horas estimadas "2h"
    Y pulso "Publicar tarjeta"
    Entonces la tarjeta se guarda con tipo "busco" y estado "activa"
    Y la tarjeta aparece en el feed de Inicio y en el mapa

  Escenario: Publicar con fecha de inicio y duración de varios días
    Dado que estoy creando una tarjeta de tipo "busco" en la categoría "Cuidados"
    Cuando indico una fecha de inicio y una duración de 5 días
    Entonces la tarjeta se guarda con fecha de inicio y fecha de fin calculada
    Y la tarjeta aparece en el calendario ocupando ese rango de fechas

  Escenario: Intentar publicar sin categoría
    Dado que estoy en "Crear tarjeta" en modo "Busco"
    Cuando dejo el campo de categoría vacío
    Y pulso "Publicar tarjeta"
    Entonces la tarjeta no se guarda
    Y veo un mensaje indicando que la categoría es obligatoria

  Escenario: Intentar publicar sin descripción
    Dado que estoy en "Crear tarjeta" en modo "Busco" con la categoría "Cuidados" seleccionada
    Cuando dejo el campo de descripción vacío
    Y pulso "Publicar tarjeta"
    Entonces la tarjeta no se guarda
    Y veo un mensaje indicando que la descripción es obligatoria
