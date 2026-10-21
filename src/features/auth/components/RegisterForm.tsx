import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { registerWithEmail } from "../services/auth.service"
import { validateEmail } from "../utils/validateEmail"
import { validatePassword } from "../utils/validatePassword"
import { getAuthErrorMessage } from "../utils/authErrors"
import { useUserStore } from "../../auth/store/userStore"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const setUserName = useUserStore(s => s.setName)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if(name == ''){
      setError("Añade un nombre de usuario")
      return
    }
    const emailError = validateEmail(email)
    if (emailError) { setError(emailError); return }

    const passwordError = validatePassword(password)
    if (passwordError) { setError(passwordError); return }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      await registerWithEmail(email, password, name)
      localStorage.setItem('onboarding_seen', 'true')
      setUserName(name)
      navigate("/home", { state: { justRegistered: true } })
    } catch (err) {
      setError(getAuthErrorMessage(err))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-body font-medium text-ink">
          Tu nombre
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de usuario"
          className="field w-full"
        />
      </div>

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
          className="field w-full"
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
            className="field w-full pr-12"
          />
          <button
            type="button"
            aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setPasswordVisible((v) => !v)}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex size-12 items-center justify-center rounded-full text-ink-muted hover:text-ink transition-colors"
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
          className="field w-full"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-danger-ink font-body">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full min-h-12 mt-2 rounded-full bg-ink py-4 font-body font-medium text-canvas hover:bg-ink/90 transition-colors"
      >
        Crear cuenta
      </button>
    </form>
  )
}