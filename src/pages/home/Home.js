import { useEffect, useState } from "react"
import RecipeList from "../../components/recipeList/RecipeList"
import { db } from "../../firebase/Config"

import "./Home.css"
import { collection, getDocs } from "firebase/firestore"

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(()=> {
    setIsLoading(true)

    const ref = collection(db, 'recipes')
    getDocs(ref)
      .then((snapshot)=>{
        if(snapshot.empty){
          setError("No recipes to load...")
          setIsLoading(false)
        }else{
          let result = []
          snapshot.docs.forEach((doc)=>{
            result.push({id: doc.id, ...doc.data()})
            
          })
          setData(result)
          setIsLoading(false)
        }
        
      })
  }, [])

  return (
    <div className="home">
      {error && <h2 className="error">{error}</h2>}
      {isLoading && <p className="loading">isLoading...</p>}
      {data && <RecipeList recipes = {data} />}
    </div>
  )
}
