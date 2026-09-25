import { useNavigate } from "react-router-dom"

export default function OnboardingPage(){

    const navigate = useNavigate()

    function onStart(){
        navigate('/register')
    }

    function onLogin(){
        navigate('/login')
    }

  return (
    <div>
    <h1>
        barrio.
    </h1>

    <span>
        tiempo que nos conecta, en tu barrio
    </span>

    <p>
        Intercambia tiempo, habilidades y cuidados con la gente de tu calle. Sin dinero de por medio.
    </p>

    <span>
        +500 vecinos ya han compartido 2.000h
    </span>

    <button onClick={onStart}>
      Empezar ahora
    </button>

    <button onClick={onLogin}>
      Ya tengo cuenta
    </button>
    </div>
    
  )
}
