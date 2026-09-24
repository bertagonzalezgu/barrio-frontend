import RegisterForm from "../components/RegisterForm"
import { Link } from "react-router-dom"

export default function RegisterPage(){
  return (
    <main>
      <div>

        <header>
          <h1>
            Crear Cuenta
          </h1>
        </header>

        <div>
          <RegisterForm />

          <p>
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              >
              Inicia sesión
            </Link>
          </p>

        </div>
        
      </div>
    </main>
  )
}