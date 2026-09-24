# language: es
Característica: Onboarding para usuarias nuevas
  Como usuaria nueva que abre la app por primera vez
  Quiero entender rápido qué es barrio. y cómo funciona el sistema de horas
  Para decidir si me registro

  Escenario: Ver la pantalla de bienvenida antes de iniciar sesión
    Dado que abro la app por primera vez sin sesión iniciada
    Entonces veo la pantalla de onboarding con el nombre, el lema y una breve explicación del sistema de horas

  Escenario: Empezar desde el onboarding
    Dado que estoy en la pantalla de onboarding
    Cuando pulso "Empezar ahora"
    Entonces se me lleva al flujo de registro

  Escenario: Ya tener cuenta desde el onboarding
    Dado que estoy en la pantalla de onboarding
    Cuando pulso "Ya tengo cuenta"
    Entonces se me lleva al flujo de inicio de sesión
