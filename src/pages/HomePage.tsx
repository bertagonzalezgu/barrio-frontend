import { useUser } from "../features/auth/hooks/useUser"
import { useUserStore } from "../features/auth/store/userStore"
import WalletBalance from "../features/wallet/components/WalletBalance"

export default function HomePage(){
  useUser()
  const name = useUserStore(s => s.name)
  const userName = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <main className="flex flex-col gap-6 px-4 pt-6 pb-24">

      <section>
        <h1 className="text-2xl font-display font-bold text-ink">
          Hola, {userName}
        </h1>
        <p className="text-sm font-body text-ink/60 mt-1">Banca de Tiempo</p>
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
        <p className="text-xs font-body text-ink/40 text-center">
          Tarjetas · próximamente
        </p>
      </section>

      <button className="fixed bottom-20 right-4 bg-ink text-paper font-body font-medium px-4 py-3 rounded-full shadow-lg text-sm">
        + Crear tarjeta
      </button>

    </main>
  )
}