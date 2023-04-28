import {ReactComponent as TMDBLogo} from '../svg/blue_short-TMDB.svg'
import Tilt from 'react-parallax-tilt';
import './About.css'

const About = () => {
  return (
    <Tilt>
      <div className="about-section">
        <h2>About <span style={{fontWeight: 'bolder', fontStyle: 'italic', textDecoration:'underline'}}>Project Film Search</span></h2>
        <p>Search films by Year & Add to Favourites</p>
        <p>By <span style={{fontStyle: 'italic'}}>rainbowskydev</span></p>
        <p style={{fontSize:'small'}}>This product uses the TMDB API but is not endorsed or certified by TMDB. {'  '}
          <TMDBLogo style={{maxHeight:'12px', width: 'auto'}}/>
        </p>
      </div>
    </Tilt>
  )
}

export default About
