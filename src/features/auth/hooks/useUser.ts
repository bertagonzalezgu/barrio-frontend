import { useEffect } from "react";
import { auth } from '../../../services/firebase'
import { useUserStore } from "../store/userStore";
import { onAuthStateChanged } from "firebase/auth";

export function useUser(){

    const setName = useUserStore(s => s.setName)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
        async function fetchName(){
            if(!user) return
            const token = await user.getIdToken()

            const res = await fetch('http://localhost:3001/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if (!res.ok) return

            const data = await res.json()
            setName(data.name)
        }
        fetchName()        
        })
        return unsubscribe
    }, [setName])

}
