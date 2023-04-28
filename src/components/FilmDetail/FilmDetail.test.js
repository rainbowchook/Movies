import { render, screen } from '@testing-library/react'
import FilmDetail from './FilmDetail'
import fetchMock from 'jest-fetch-mock'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { mockResponseData } from '../FilmRow/FilmRow.test'

const originalEnv = process.env

beforeAll(() => {
  fetchMock.enableMocks()
  process.env = {
    REACT_APP_TMDB_API_KEY: 'FAKE_TMDB_API_KEY'
  }
  console.log(process.env)
})

beforeEach(() => {
  fetchMock.resetMocks()
})

afterAll(() => {
  process.env = originalEnv
  fetchMock.disableMocks()
})

describe('FilmDetail test', () => {
  test('renders FilmDetail correctly with movie ID that exists', async () => {
    const { id, title, poster_path, backdrop_path, overview, release_date, tagline } = mockResponseData.results[0]

    let fakeHistory = createMemoryHistory({
      initialEntries: [`/films/${id}`]
    })
    console.log(fakeHistory.location.pathname)
    expect(fakeHistory.location.pathname).toEqual(`/films/${id}`)

    jest.mock('react-router-dom', (id) => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        filmId: id,
      }),
    }));

    render(
      <Router location={fakeHistory} navigator={fakeHistory}>
        <FilmDetail />
      </Router>
    )

    fetch.mockResponseOnce(
      JSON.stringify({
        id,
        title,
        poster_path,
        backdrop_path,
        overview,
        release_date,
        tagline
      })
    )
    expect(fetch.mock.calls.length).toEqual(1)
    console.log(fetch.mock)
    expect(fetch.mock.calls[0][0]).toEqual(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    // screen.debug()
    const img = await screen.findByAltText(title, {exact: false})
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toMatch(new RegExp(backdrop_path, "i"))
  })

  test('renders FilmDetail correctly with movie ID that does not exist', async () => {
   const fakeWrongId = 'xyz123'
    let fakeHistory = createMemoryHistory({
      initialEntries: [`/films/${fakeWrongId}`]
    })
    expect(fakeHistory.location.pathname).toEqual(`/films/${fakeWrongId}`)

    render(
      <Router location={fakeHistory} navigator={fakeHistory}>
        <FilmDetail />
      </Router>
    )

    fetch.mockResponseOnce(
      JSON.stringify({
        message: 'Invalid API key: You must be granted a valid key.',
      })
    )
    expect(fetch.mock.calls.length).toEqual(1)
    const text = await screen.findByText(/No film selected/i)
    expect(text).toBeInTheDocument()
  })
})
