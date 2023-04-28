import './Logo.css'
import Tilt from 'react-parallax-tilt';

const Logo = () => {
  return (
    <div style={{width: '50%', margin: '50px auto'}}>
      <Tilt>
        <div
          className='logo'
          style={{width: '300px', height: '300px', boxShadow: 'inset 2px 2px 2px 1px rgba(0, 0, 0, 0.1)'}}
          role='button'
        >
          <div className="bg-svg"></div>
        </div>
      </Tilt>
    </div>

  )
}

export default Logo
