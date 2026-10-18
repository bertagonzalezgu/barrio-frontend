import { useNavigate } from "react-router-dom"

export default function OnboardingPage() {
  const navigate = useNavigate()

  function onStart() {
    navigate('/register')
  }

  function onLogin() {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-onboarding flex flex-col justify-center items-center px-6 pb-12 gap-4">

      <div className="max-w-2xl flex flex-col justify-center p-6 pb-12 gap-4">

        <h1 className="font-display font-bold text-6xl text-white drop-shadow-lg">
          barrio.
        </h1>

        <span className="font-body text-sm text-white/60 tracking-widest uppercase">
          tiempo que nos conecta, en tu barrio
        </span>

        <p className="font-body text-base text-white/90 leading-relaxed">
          Intercambia tiempo, habilidades y cuidados con la gente de tu calle. Sin dinero de por medio.
        </p>

        <span className="font-data text-xs text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 self-start">
          +500 vecinos ya han compartido 2.000h
        </span>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={onStart}
            className="w-full bg-white text-ink font-body font-semibold py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Empezar ahora
          </button>

          <button
            onClick={onLogin}
            className="w-full text-white/80 font-body py-2 hover:text-white hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            Ya tengo cuenta
          </button>
        </div>

      </div>

    </div>
  )
}