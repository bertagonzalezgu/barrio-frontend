# language: es
Característica: Moderar el contenido generado antes de publicarse
  Como responsable de la comunidad
  Quiero que el contenido generado se revise automáticamente antes de publicarse
  Para evitar contenido sexual, ilegal o que facilite el acceso indebido a una vivienda

  Escenario: Contenido seguro se publica sin fricción
    Dado que el texto en bruto no contiene contenido problemático
    Cuando genero la tarjeta con IA
    Entonces la propuesta se muestra normalmente y puedo publicarla

  Escenario: Contenido inseguro se bloquea
    Dado que el texto en bruto contiene contenido sexual, ilegal o ambiguo sobre acceso a una vivienda
    Cuando pulso "Generar con IA"
    Entonces no se genera ninguna tarjeta
    Y veo un aviso de que el contenido no cumple las normas de la comunidad

  Escenario: Una tarjeta denunciada se oculta hasta revisión
    Dado que una tarjeta ya publicada recibe una denuncia
    Cuando se registra la denuncia
    Entonces la tarjeta deja de ser visible en el feed, mapa y calendario hasta que se revise manualmente
