import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import BenefitsList from "../../../components/BenefitsList"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-paper flex flex-col px-6 pt-16 pb-10">
      <h1 className="font-display font-bold text-5xl text-ink mb-2">barrio.</h1>
      <p className="font-body font-medium text-ink text-lg mb-8">
        Tu tiempo vale. Intercámbialo.
      </p>

      <BenefitsList />

      <LoginForm />

      <p className="text-center text-sm font-body text-ink/60 mt-4">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="font-medium text-ink underline underline-offset-2">
          Regístrate
        </Link>
      </p>

      <p className="mt-auto pt-10 text-center text-xs font-body text-ink/40 leading-relaxed">
        Al registrarte, aceptas nuestras condiciones de comunidad vecinal y el uso justo del tiempo.
      </p>
    </main>
  )
}