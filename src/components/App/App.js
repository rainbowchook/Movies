import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import FilmLibrary from '../FilmLibrary/FilmLibrary';
import Home from '../Home/Home'
import FilmDetail from '../FilmDetail/FilmDetail';
import About from '../About/About'
import PageNotFound from '../PageNotFound/PageNotFound';
import NavBar from '../NavBar/NavBar';

function App() {
  const [faves, setFaves] = useState([]) //push here if favourited.
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="films" element={<FilmLibrary {...{faves, setFaves}}/>} >
            <Route path=":filmId" element={<FilmDetail />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
