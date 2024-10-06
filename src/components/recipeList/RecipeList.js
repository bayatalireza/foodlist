import { Link } from 'react-router-dom'
import deleteIcon from '../../assets/delete-icon.svg'
import "./RecipeList.css"
import { useTheme } from '../../hooks/useTheme'
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { deleteDoc } from 'firebase/firestore';


export default function RecipeList({recipes}) {
  const {mode} = useTheme()
  const handleClick = async(id)=> {
    try {
      const ref = doc(db, 'recipes', id) 
      await deleteDoc(ref)
      
    } catch (error) {
      return error
    }
  }
  return (
    <div className="recipe-list">
        {
            recipes.map((recipe) => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3 >{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make</p>
                    <div>{recipe.method.substring(0,100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                    <img src={deleteIcon} alt='delete icon' className='delete' onClick={()=>{handleClick(recipe.id)}} />
                </div>
                
            ))
        }
    </div>
  )
}
