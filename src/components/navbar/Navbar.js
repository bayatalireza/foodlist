import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

import "./Navbar.css"

export default function Navbar() {

  const{color, changeColor}= useTheme()
  return (
    <div className='navbar' style={{background: color}}>
      <nav onClick={()=>changeColor('green')
      }>
        <Link to="/" className='brand'><h1>Recipe Food</h1></Link>
        <Link to="/create" >Create Recipe</Link>
      </nav>
    </div>
  )
}
