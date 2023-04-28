import {Link} from 'react-router-dom'
import Logo from '../Logo/Logo'

const Home = () => {
  return (
    <div style={{width: '50%', margin: '50px auto', textAlign: 'center', justifyItems: 'center'}}>
      <h1>Welcome to <br/>
        <span style={{fontStyle: 'italic', fontWeight: 'bolder', textShadow: '1px 1px 2px #558abb'}}>
          Project Film Search
        </span>
      </h1>
      <Link to='/films'><Logo /></Link>
      <p>Click to begin Film Search</p>
    </div>
  )
}

export default Home
