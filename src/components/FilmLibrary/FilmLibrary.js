import {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {API_KEY, BASE_URI} from '../../TMDB'
import FilmRowList from '../FilmRowList/FilmRowList';
import './FilmLibrary.css'

function FilmLibrary({faves, setFaves}) {
  const [films, setFilms] = useState([])
  // const [faves, setFaves] = useState([]) //push here if favourited.
  const [category, setCategory] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [primaryReleaseYear, setPrimaryReleaseYear] = useState(new Date().getFullYear())
  const [hasNext, setHasNext] = useState(false)
  const [isFirstLoadYear, setIsFirstLoadYear] = useState(true)
  const lastScrollTop = useRef({all: 0, faves: 0})
  const divRef = useRef()

  const fetchFilmsByDiscover = (primaryReleaseYear, page) => {
    setLoading(true)
    const URL = `${BASE_URI}/discover/movie?primary_release_year=${primaryReleaseYear}&sort_by=popularity.desc&language=en_US&api_key=${API_KEY}&page=${page}`
    fetch(URL)
      .then(res => {
        if(!res.ok || res.status !== 200 || res.status >= 400) throw new Error('Cannot Fetch Movies') //wrong endpoint or wrong permissions
        return res.json()
      })
      .then(({page, results, total_pages}) =>
        {
          const newFilms = results.map(film => {
            const {id, title, poster_path, backdrop_path, overview, release_date, tagline} = film
            const newFilm = {
              id,
              title,
              poster_path,
              backdrop_path,
              overview,
              release_date,
              tagline
            }
            return newFilm
          })
          if(page === 1) {
            setFilms(newFilms)
          } else {
            setFilms([...films, ...newFilms])
          }
          if(page < total_pages) {
            setHasNext(true)
          } else {
            setHasNext(false)
          }
          setError('')
        }
      )
      .catch(err => setError('Error: ' + err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    lastScrollTop.current.all = 0
    fetchFilmsByDiscover(primaryReleaseYear, 1)
    setCategory('all')
    return () => setIsFirstLoadYear(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryReleaseYear])

  useEffect(() => {
    if(isFirstLoadYear) {
      setIsFirstLoadYear(!isFirstLoadYear)
    } else {
      if(page !== 1 && !loading) {
        fetchFilmsByDiscover(primaryReleaseYear, page)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isFirstLoadYear])

  useLayoutEffect(() => {
    if(category === 'all') divRef.current.scrollTo(0, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryReleaseYear])

  useLayoutEffect(() => {
    if (category === 'all') divRef.current.scrollTo(0, lastScrollTop.current.all)
    if (category === 'faves') divRef.current.scrollTo(0,lastScrollTop.current.faves)
  }, [category])

  const isFaveFound = (id) => faves.some(fave => fave.id === id)

  const getFilm = (id) => films.find(film => film.id === id)

  const addFilm = (id, ...fave) => {
    const newFilm = getFilm(id)
    return fave ? [...faves, newFilm] : [...films, newFilm]
  }

  const removeFilm = (id, ...fave) => {
    return fave ? faves.filter(fave => fave.id !== id) : films.filter(film => film.id !== id)
  }

  const handleClick = (e, id) => {
    if(e.target.id === 'queue') {
      const isFave = isFaveFound(id)
      if(!isFave) {
        setFaves(addFilm(id, true))
      } else {
        setFaves(removeFilm(id, true))
      }
    }
  }

  const getNextPage = () => {
    if (hasNext && category === 'all') setPage(prev => prev + 1)
  }

  const handleScroll = (e) => {
    for (let catRef in lastScrollTop.current) {
      if(catRef === category) {
        lastScrollTop.current[catRef] = Math.ceil(divRef.current.scrollTop)
      }
    }
    if((Math.ceil(divRef.current.scrollTop) + divRef.current.clientHeight >= divRef.current.scrollHeight) && !loading) {
      getNextPage()
    }
  }

  const handleChangeYear = (e) => {
    setPrimaryReleaseYear(e.target.value)
    setPage(1)
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list" onScroll={handleScroll} id='film-list' ref={divRef}>
        <h1 className="section-title">FILMS{' '}
        <select defaultValue={primaryReleaseYear} onChange={handleChangeYear}>
          { new Array(101).fill(0).map((_, i) => {
              const start = new Date(Date.now()).getFullYear() - 100
              return <option key={start + i} value={start + i}>{start + i}</option>
            })
          }
        </select>
        </h1>
        <div className="film-list-filters">
          <button className={`film-list-filter ${category === 'all' ? 'is-active' : undefined}`} onClick={() => setCategory('all')}>
            ALL
            <span className="section-count">{films.length}</span>
          </button>
          <button className={`film-list-filter ${category === 'faves' ? 'is-active' : undefined}`} onClick={() => setCategory('faves')}>
            FAVES
            <span className="section-count">{faves && faves.length ? faves.length : 0}</span>
          </button>
        </div>
        <FilmRowList {...{category, films, faves, handleClick, isFaveFound}}/>
      </div>
      <div className="film-details">
        <h1 className="section-title"> {loading ? 'Loading...' : (error ? `${error}` : 'DETAILS')}</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default FilmLibrary
