# language: es
Característica: Verificar identidad para servicios de categoría Cuidados
  Como usuario que quiere ofrecer o aceptar un servicio de categoría Cuidados
  Quiero verificar mi identidad una vez
  Para poder publicar o aceptar tarjetas que impliquen entrar en una vivienda

  Escenario: Completar la verificación con éxito
    Dado que no tengo la identidad verificada
    Cuando completo el proceso de verificación (Stripe Identity, modo test) con datos válidos
    Entonces mi cuenta pasa a estado "verificado"
    Y veo la insignia "Identidad verificada" en mi perfil

  Escenario: Intentar publicar en Cuidados sin verificar
    Dado que mi cuenta no está verificada
    Cuando intento publicar una tarjeta en la categoría "Cuidados"
    Entonces no puedo completar la publicación
    Y veo un aviso que me dirige al proceso de verificación

  Escenario: Verificación rechazada
    Dado que he enviado mis datos de verificación
    Cuando el proveedor rechaza la verificación
    Entonces mi cuenta se mantiene como "no verificada"
    Y puedo volver a intentarlo
