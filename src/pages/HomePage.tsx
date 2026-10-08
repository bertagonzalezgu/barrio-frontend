import { useUser } from "../features/auth/hooks/useUser"
import { useUserStore } from "../features/auth/store/userStore"
import WalletBalance from "../features/wallet/components/WalletBalance"
import { useNavigate } from "react-router-dom"
import CardList from "../features/cards/components/CardList"

export default function HomePage(){
  useUser()
  const name = useUserStore(s => s.name)
  const userName = name.charAt(0).toUpperCase() + name.slice(1)
  const navigate = useNavigate()

  return (
    <main className="flex flex-col gap-6 px-4 pt-6 pb-24">

      <section>
        <h1 className="text-2xl font-display font-bold text-ink">
          Hola, {userName}
        </h1>
        <p className="text-m font-body text-ink/80 mt-1">¿Qué podemos hacer por ti hoy? Cada hora que das vuelve a tu comunidad.</p>
      </section>

      <WalletBalance/>

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-teal text-paper font-body font-medium py-3 rounded-xl text-sm">
          Buscar ayuda
        </button>
        <button className="border border-teal text-teal font-body font-medium py-3 rounded-xl text-sm">
          Ofrecer mi tiempo
        </button>
      </div>

      <section>
        <p className="text-xs font-body text-ink/40 text-center">
          Categorías · próximamente
        </p>
      </section>

      <section>
        <CardList />
      </section>

      <button
        onClick={() => navigate('/cards/crear')}
        className="fixed bottom-20 right-4 bg-ink text-paper font-body font-medium px-4 py-3 rounded-full shadow-lg text-sm cursor-pointer"
      >
        + Crear tarjeta
      </button>

    </main>
  )
}