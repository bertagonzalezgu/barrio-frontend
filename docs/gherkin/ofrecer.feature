# language: es
Característica: Publicar una oferta de ayuda (Ofrecer)
  Como jubilado con tiempo libre
  Quiero ofrecer clases de guitarra a cambio de horas
  Para sentirme útil y acumular créditos

  Escenario: Publicar una tarjeta de "ofrezco" con éxito
    Dado que he iniciado sesión
    Y estoy en la pantalla "Crear tarjeta" en modo "Ofrezco"
    Cuando relleno la categoría "Comunidad", la descripción "Ofrezco clases de guitarra" y las horas "1h por sesión"
    Y pulso "Publicar tarjeta"
    Entonces la tarjeta se guarda con tipo "ofrezco" y estado "activa"

  Escenario: La tarjeta ofrecida es visible para otros usuarios en modo Buscar
    Dado que he publicado una tarjeta de "ofrezco" de clases de guitarra
    Cuando otro usuario abre el modo "Buscar" y no tiene ningún filtro de categoría activo
    Entonces ve mi tarjeta en la vista de tarjetas (swipe) o en la lista, según la vista que tenga seleccionada

  Escenario: Generar la tarjeta con IA a partir de texto en bruto
    Dado que estoy en "Crear tarjeta" en modo "Ofrezco"
    Cuando escribo "doy clases de guitarra los martes por la tarde"
    Y pulso "Generar con IA"
    Entonces la IA devuelve un título corto, una descripción breve y un icono de la lista cerrada
    Y puedo editar la propuesta antes de publicarla

  Escenario: El contenido generado no pasa la moderación
    Dado que estoy en "Crear tarjeta" y he escrito un texto que la clasificación de seguridad marca como no permitido
    Cuando pulso "Generar con IA"
    Entonces no se genera ninguna tarjeta
    Y veo un aviso de que el contenido no se puede publicar
