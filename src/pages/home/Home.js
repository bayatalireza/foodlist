import RecipeList from "../../components/recipeList/RecipeList";

import "./Home.css";

import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const { collectionData: data, isLoading, error } = useCollection("recipes");

  return (
    <div className="home">
      {error && <h2 className="error">{error}</h2>}
      {isLoading && <p className="loading">isLoading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
