import FilmRow from '../FilmRow/FilmRow'

const FilmRowList = ({category, films, faves, handleClick, isFaveFound}) => {
  return (
    <>
      {
        category === 'all'
          ? films.map(film => <FilmRow key={film.id} film={film} handleClick={handleClick} favourite={isFaveFound(film.id)}/>)
          : faves.map(film => <FilmRow key={film.id} film={film} handleClick={handleClick} favourite={isFaveFound(film.id)}/>)
      }
    </>
  )
}

export default FilmRowList
