import { useWallet } from "../hooks/useWallet"
import { useWalletStore } from "../store/walletStore"

export default function WalletBalance() {
  useWallet()
  const balance = useWalletStore(s => s.balance)
  const impact = useWalletStore(s => s.impact)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
      <div className="bg-teal text-white rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden gap-2">
        <p className="text-[clamp(0.6rem,2vw,0.9rem)] font-body font-light text-white uppercase tracking-wider">
          Tu saldo disponible
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-[clamp(1rem,3vw,2rem)] font-display font-bold text-white leading-none">
            {balance}
          </span>
          <span className="text-[clamp(0.8rem,2.5vw,1.2rem)] font-body text-white">
            {balance === 1 ? "hora" : "horas"}
          </span>
        </div>
      </div>

      <div className="bg-gold text-ink rounded-2xl p-5 flex flex-col justify-between shadow-sm gap-2">
        <p className="text-[clamp(0.6rem,2vw,0.9rem)] font-body font-medium text-black uppercase tracking-wider">
          Tu impacto local
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-[clamp(1rem,3vw,2rem)] font-display font-bold text-black leading-none">
            {impact}
          </span>
          <span className="text-[clamp(0.8rem,2.5vw,1.2rem)] font-body text-black">
            {impact === 1 ? "favor" : "favores"}
          </span>
        </div>
      </div>
    </div>
  )
}