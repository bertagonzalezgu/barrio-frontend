import { Link } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import BenefitsList from "../../../components/BenefitsList"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-paper flex flex-col px-6 pt-16 pb-10 items-center">
      <div className="max-w-2xl flex flex-col justify-center p-6 pb-12 gap-4">
        <h1 className="font-display font-bold text-5xl text-ink mb-2">barrio.</h1>
        <p className="font-body font-medium text-ink text-lg mb-8">
          Crea tu cuenta y empieza a compartir tiempo.
        </p>

        <BenefitsList />

        <RegisterForm />

        <p className="text-center text-sm font-body text-ink/60 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-ink underline underline-offset-2">
            Inicia sesión
          </Link>
        </p>

        <p className="mt-auto pt-10 text-center text-xs font-body text-ink/40 leading-relaxed">
          Al registrarte, aceptas nuestras condiciones de comunidad vecinal y el uso justo del tiempo.
        </p>
      </div>
    </main>
  )
}