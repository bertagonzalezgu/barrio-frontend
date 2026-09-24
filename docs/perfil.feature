# language: es
Característica: Ver y editar el perfil personal
  Como usuario
  Quiero ver y editar mi perfil
  Para gestionar cómo me ven los demás en la comunidad

  Escenario: Ver mi perfil con historial de créditos
    Dado que he realizado varios intercambios
    Cuando abro la pantalla "Perfil"
    Entonces veo mi valoración media, mi saldo de horas y el historial de transacciones

  Escenario: Editar mi avatar y nombre
    Dado que estoy en mi perfil
    Cuando cambio mi nombre visible y guardo los cambios
    Entonces el nuevo nombre se refleja en mis tarjetas y en el chat

  Escenario: Ver la insignia de verificado
    Dado que mi identidad está verificada
    Cuando abro mi perfil o alguien más lo visita
    Entonces se muestra la insignia "Identidad verificada"
