import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {API_KEY, BASE_URI} from '../../TMDB'
import './FilmDetail.css'

function FilmDetail() {
  const [selectedFilm, setSelectedFilm] = useState(null)
  const params = useParams()

  const fetchFilmById = (id) => {
    const URL = `${BASE_URI}/movie/${id}?api_key=${API_KEY}`
    fetch(URL)
      .then(res => {
        if(!res.ok || res.status !== 200 || res.status >= 400) throw new Error('Cannot Fetch Movie') //wrong endpoint or wrong permissions
        return res.json()
      })
      .then(film => {
        const {title, poster_path, backdrop_path, overview, release_date, tagline} = film
        const newFilm = {
          id,
          title,
          poster_path,
          backdrop_path,
          overview,
          release_date,
          tagline
        }
        setSelectedFilm(newFilm)
      })
      .catch(err => console.log('Error: ' + err.message))
  }

  useEffect(() => {
    fetchFilmById(params.filmId)
  }
  , [params.filmId])

  if(selectedFilm) {
    const {title, poster_path, backdrop_path, overview, tagline} = selectedFilm
    return (
      <div className="FilmDetail is-hydrated">
        <figure className="film-backdrop">
          <img src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`} alt={`${title} backdrop`} />
          <h1 className="film-title">{title}</h1>
        </figure>

        <div className="film-meta">
          <p className="film-detail-overview">
            <img src={`https://image.tmdb.org/t/p/w780${poster_path}`} className="film-detail-poster" alt={`${title} poster`} />
            <span className='film-detail-tagline'>{tagline} </span>
            {overview}
          </p>
        </div>
      </div>
    )
  }
  return <FilmDetailEmpty />
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
    <p>
      <i className="material-icons">subscriptions</i>
      <span>No film selected</span>
    </p>

  </div>
  )
}

export default FilmDetail
