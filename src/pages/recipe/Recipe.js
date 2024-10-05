import { useParams } from "react-router-dom"

import { db } from "../../firebase/Config"
import "./Recipe.css"
import { useTheme } from "../../hooks/useTheme"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"

export default function Recipe() {

  const [isLoading, setIsLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(false)

  const {mode} = useTheme()
  const{id} = useParams()

  useEffect(()=>{
    setIsLoading(true)
    
    const ref = doc(db, 'recipes', id )
    getDoc(ref)
    .then(doc=>{
      if(doc.empty){
        setIsLoading(false)
        setError("No recipe to load...")
      }else{
        setIsLoading(false)
        setRecipe(doc.data())
      }
    })
  }, [])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {recipe && (
        <>
        <h2 className="page-title">{recipe.title}</h2>
        <p>Takes {recipe.cookingTime} to Cook.</p>
        <ul>
          {recipe.ingredients.map((ing)=> (
            <li key={ing.index}>{ing}</li>
          ))}
        </ul>
        <p className="method">{recipe.method}</p>
        </>
      )}

    </div>
  )
}
