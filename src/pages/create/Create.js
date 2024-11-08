import { useState } from "react";
import "./Create.css";

import { addDoc, collection} from "firebase/firestore";
import { db } from "../../firebase/Config";
import { navigate, useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
    
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
      const doc={title, ingredients, method, cookingTime: cookingTime + " minutes"
    }
    try {
      const ref = collection(db, 'recipes')
      await addDoc(ref, doc)
      navigate("/")
    } catch (err) {
      return console.log(err);
      
      
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
            />
            <button  onClick={handleAdd}>Add</button>
          </div>
        </label>
        <p>
          Current Ingredients:{" "}
          {ingredients.map((event) => (
            <em key={event}>{event}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          ></textarea>
        </label>
        <label>
          <span>Cooking Time</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
