import {Link} from 'react-router-dom'
import './FilmRow.css'

const FilmRow = ({film, handleClick, favourite}) => {
  const {id, title, poster_path, release_date} = film
  return (
    <div className="FilmRow">
      <img src={`https://image.tmdb.org/t/p/w780${poster_path}`} alt={`${title} film poster`}/>
      <div className="film-summary">
        <h3>{title.toUpperCase()}</h3>
        <p>{new Date(release_date).getFullYear()}</p>
        <div className="actions">
          <button className="action" onClick={(e) => handleClick(e, id)}>
            <span data-testid='favourite-span' className="material-icons" name="queue" id="queue">{favourite ? 'remove_from_queue' : 'add_to_queue'}</span>
          </button>
          <Link to={`/films/${id}`} className="action">
            <span className="material-icons">read_more</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FilmRow
