import { useWallet } from "../hooks/useWallet"
import { useWalletStore } from "../store/walletStore"

export default function WalletBalance() {
  useWallet()
  const balance = useWalletStore(s => s.balance)
  const impact = useWalletStore(s => s.impact)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
      <div className="bg-hours text-on-hours rounded-card p-5 flex flex-col justify-between shadow-soft relative overflow-hidden gap-2">
        <p className="text-[clamp(0.6rem,2.6vw,1rem)] font-body font-medium text-on-hours uppercase tracking-wider">
          Tu saldo disponible
        </p>
        <div className="flex items-baseline justify-between">
          <span className="text-[clamp(1rem,7vw,2rem)] font-display font-bold tabular-nums text-on-hours leading-none">
            {balance}
          </span>
          <span className="text-[clamp(0.8rem,2.5vw,1.2rem)] font-body text-on-hours">
            {balance === 1 ? "hora" : "horas"}
          </span>
        </div>
      </div>

      <div className="bg-primary text-on-primary rounded-card p-5 flex flex-col justify-between shadow-primary gap-2">
        <p className="text-[clamp(0.6rem,2.6vw,1rem)] font-body font-medium text-on-primary uppercase tracking-wider">
          Tu impacto local
        </p>
        <div className="flex items-baseline justify-between">
          <span className="text-[clamp(1rem,7vw,2rem)] font-display font-bold tabular-nums text-on-primary leading-none">
            {impact}
          </span>
          <span className="text-[clamp(0.8rem,2.5vw,1.2rem)] font-body text-on-primary">
            {impact === 1 ? "favor" : "favores"}
          </span>
        </div>
      </div>
    </div>
  )
}