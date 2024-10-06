import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/Config"

export const useCollection = (c) => {
    const[collectionData, setCollectionData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(()=> {
        let ref = collection(db, c)
        setIsLoading(true)

        const unsub = onSnapshot(ref,(snapshot)=> {
            if(snapshot.empty){
                setError("No recipes to load...")
            }else{
                
                let result = []
                snapshot.docs.forEach((doc)=> {
                    result.push({id: doc.id, ...doc.data()})
                })
                setCollectionData(result)
                setIsLoading(false)
            }
        })
        return ()=> unsub()
    }, [c])
    return {collectionData, isLoading, error}
}
