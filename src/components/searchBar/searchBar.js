import { useState } from "react";
import "./searchBar.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search?q=${term}`)
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Search:</span>
          <input
            type="text"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            required
          />
        </label>
      </form>
    </div>
  );
}
