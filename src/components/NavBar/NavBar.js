import {NavLink} from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <ul className='navbar'>
      <li><NavLink to="/" className="page-link">Home</NavLink></li>
      <li><NavLink to="/films" className="page-link">Films</NavLink></li>
      <li><NavLink to="/about" className="page-link">About</NavLink></li>
    </ul>
  )
}

export default NavBar
