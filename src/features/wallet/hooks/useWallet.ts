import { useEffect } from "react";
import { auth } from '../../../services/firebase'
import { useWalletStore } from "../store/walletStore";
import { onAuthStateChanged } from "firebase/auth";

export function useWallet(){

    const setBalance = useWalletStore(s => s.setBalance)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
        async function fetchBalance(){
            if(!user) return
            const token = await user.getIdToken()

            const res = await fetch('http://localhost:3001/api/wallet/balance', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if (!res.ok) return

            const data = await res.json()
            setBalance(data.credits)
        }
        fetchBalance()        
        })
        return unsubscribe
    }, [])

}
