# language: es
Característica: Generar una tarjeta con IA
  Como usuario que va a publicar una tarjeta
  Quiero que la IA me sugiera título, descripción e icono a partir de lo que escribo en bruto
  Para no tener que redactarlo yo desde cero

  Escenario: Generar una sugerencia con éxito
    Dado que he escrito una descripción en bruto de lo que necesito u ofrezco
    Cuando pulso "Generar con IA"
    Entonces recibo un título, una descripción breve y un icono de la lista cerrada

  Escenario: Editar la sugerencia antes de publicar
    Dado que la IA ha generado una propuesta de tarjeta
    Cuando modifico el título o la descripción propuestos
    Y pulso "Publicar tarjeta"
    Entonces se guarda mi versión editada, no la original de la IA

  Escenario: Volver a generar si la propuesta no convence
    Dado que la IA ha generado una propuesta de tarjeta
    Cuando pulso "Generar con IA" de nuevo sin cambiar el texto en bruto
    Entonces recibo una nueva propuesta, que puede diferir de la anterior
