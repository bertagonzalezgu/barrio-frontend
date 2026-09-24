import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerWithEmail } from "../services/auth.service"
import { FirebaseError } from "firebase/app"
import type { FormEvent } from "react"

export default function RegisterForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setError(null)

        if(password !== confirmPassword){
        setError("Las contraseñas no coinciden")
        return
        }

        try{
          await registerWithEmail(email, password)
          navigate("/", { state: { justRegistered: true } })
        } catch(err){
          if(err instanceof FirebaseError && err.code === "auth/email-already-in-use") {
            setError("Este email ya está registrado")
          } else{
            setError("No se ha podido completar el registro")
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
          placeholder="Mínimo 6 caracteres"
          />
      </div>

      <div>
        <label htmlFor="confirm-password">
          Confirmar Contraseña
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          placeholder="Mínimo 6 caracteres"
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
        Registrarse
      </button>
    </form>
  )
}