import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <main>
      <div>
        
        <header>
          <h1>
            Iniciar Sesión
          </h1>
        </header>

        <div>
          
          <LoginForm />

          <p>
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              >
              Regístrate
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}