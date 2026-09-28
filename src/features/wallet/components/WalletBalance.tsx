import { useWallet } from "../hooks/useWallet"
import { useWalletStore } from "../store/walletStore"

export default function WalletBalance(){

    useWallet()
    const balanceStore = useWalletStore(s => s.balance)

  return ( 
    <>
        {balanceStore}
    </>
  )
}
