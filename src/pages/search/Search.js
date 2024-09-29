import { useFetch } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom"
import "./Search.css"
import RecipeList from "../../components/recipeList/RecipeList"

export default function Search() {

  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')
  

  const url = "http://localhost:3000/recipes?q=" + query
  
  const {error, isLoading, data} = useFetch(url)

  return (
    <div>
      <h2 className="page-title">Recipes Including: "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
      
    </div>
  )
}
