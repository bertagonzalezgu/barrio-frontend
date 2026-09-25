import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { registerWithEmail } from "../services/auth.service"
import { validateEmail } from "../utils/validateEmail"
import { validatePassword } from "../utils/validatePassword"
import { getAuthErrorMessage } from "../utils/authErrors"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const emailError = validateEmail(email)
    if (emailError) { setError(emailError); return }

    const passwordError = validatePassword(password)
    if (passwordError) { setError(passwordError); return }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      await registerWithEmail(email, password)
      localStorage.setItem('onboarding_seen', 'true')
      navigate("/home", { state: { justRegistered: true } })
    } catch (err) {
      setError(getAuthErrorMessage(err))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-body font-medium text-ink">
          Tu correo electrónico
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="hola@vecina.com"
          className="w-full border border-teal-soft rounded-xl px-4 py-3 bg-white text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal font-body text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-body font-medium text-ink">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mín. 8 caracteres, un número y un símbolo"
            className="w-full border border-teal-soft rounded-xl px-4 py-3 pr-12 bg-white text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal font-body text-sm"
          />
          <button
            type="button"
            aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setPasswordVisible((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirm-password" className="text-sm font-body font-medium text-ink">
          Repite la contraseña
        </label>
        <input
          id="confirm-password"
          type={passwordVisible ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••"
          className="w-full border border-teal-soft rounded-xl px-4 py-3 bg-white text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal font-body text-sm"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-coral font-body">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-ink text-paper font-body font-medium py-4 rounded-xl mt-2 hover:bg-ink/90 transition-colors"
      >
        Crear cuenta
      </button>
    </form>
  )
}