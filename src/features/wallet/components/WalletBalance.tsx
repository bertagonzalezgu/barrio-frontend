import { useWallet } from "../hooks/useWallet"
import { useWalletStore } from "../store/walletStore"

export default function WalletBalance() {
  useWallet()
  const balance = useWalletStore(s => s.balance)
  const impact = useWalletStore(s => s.impact)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      <div className="bg-teal text-paper rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
        <p className="text-[11px] font-body font-light text-paper uppercase tracking-wider opacity-90">
          Tu saldo disponible
        </p>
        <div className="mt-4 flex items-baseline gap-5">
          <span className="text-4xl font-display font-bold text-paper leading-none">
            {balance}
          </span>
          <span className="text-sm font-body text-teal-soft">
            {balance === 1 ? "hora" : "horas"}
          </span>
        </div>
      </div>

      <div className="bg-gold text-ink rounded-2xl p-5 flex flex-col justify-between shadow-sm">
        <p className="text-[11px] font-body font-medium text-ink/70 uppercase tracking-wider">
          Tu impacto local
        </p>
        <div className="mt-4 flex items-baseline gap-5">
          <span className="text-4xl font-display font-bold text-ink leading-none">
            {impact}
          </span>
          <span className="text-xs font-data text-ink/70 uppercase">
            {impact === 1 ? "favor" : "favores"}
          </span>
        </div>
      </div>
    </div>
  )
}