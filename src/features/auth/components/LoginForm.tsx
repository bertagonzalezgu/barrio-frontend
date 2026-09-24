import { useState } from "react"
import { loginWithEmail } from "../services/auth.service"
import { FirebaseError } from "firebase/app"
import type { FormEvent } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const location = useLocation()
    const from = (location.state as { from?: string } | null)?.from || "/"

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setError(null)

        try {
        await loginWithEmail(email, password)
        navigate(from)
        } catch (err) {
        if (err instanceof FirebaseError && err.code === "auth/invalid-credential") {
            setError("Email o contraseña incorrectos")
        } else {
            setError("No se ha podido iniciar sesión")
        }
        }
    }

    return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          placeholder="••••••••"
          />
      </div>

      {error && (
        <div role="alert">
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        >
        Iniciar sesión
      </button>      
    </form>
  )
}