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

        <h1 className="font-display font-extrabold text-h1 text-ink">
          barrio.
        </h1>

        <span className="font-body text-sm text-ink-muted tracking-widest uppercase">
          tiempo que nos conecta, en tu barrio
        </span>

        <p className="font-body text-base text-ink leading-relaxed">
          Intercambia tiempo, habilidades y cuidados con la gente de tu calle. Sin dinero de por medio.
        </p>

        <span className="font-display text-xs tabular-nums text-ink-muted bg-surface/70 backdrop-blur-sm border border-line rounded-full px-4 py-2 self-start">
          +500 vecinos ya han compartido 2.000h
        </span>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={onStart}
            className="btn-primary w-full py-4 text-base font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Empezar ahora
          </button>

          <button
            onClick={onLogin}
            className="w-full min-h-12 text-ink-muted font-body py-2 hover:text-ink hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            Ya tengo cuenta
          </button>
        </div>

      </div>

    </div>
  )
}