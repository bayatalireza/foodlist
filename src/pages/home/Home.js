import { useFetch } from "../../hooks/useFetch"
import "./Home.css"

export default function Home() {

  const{data, isLoading, error} = useFetch("http://localhost:3000/recipes")

  return (
    <div className="home">
      {error && <h2 className="error">{error}</h2>}
      {isLoading && <p className="loading">isLoading...</p>}
      {data && data.map((recipe) => (
        <h2 className="card" key={recipe.id}>{recipe.title}</h2>
      ))}
    </div>
  )
}
