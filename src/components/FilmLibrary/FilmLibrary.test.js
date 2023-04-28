import {render, screen} from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { BrowserRouter } from 'react-router-dom'
import FilmLibrary from './FilmLibrary'
import { mockResponseData } from '../FilmRow/FilmRow.test'

const originalEnv = process.env

beforeAll(() => {
  fetchMock.enableMocks()
  process.env = {
    REACT_APP_TMDB_API_KEY: 'FAKE_TMDB_API_KEY'
  }
})

beforeEach(() => {
  fetchMock.resetMocks()
})

afterAll(() => {
  process.env = originalEnv
  fetchMock.disableMocks()
})

describe('FilmLibrary test suite', () => {
  test('can render component after fetch', async () => {
    render(
      <BrowserRouter>
        <FilmLibrary />
      </BrowserRouter>
    )
    fetch.mockResponseOnce(
      JSON.stringify(mockResponseData)
    )
    expect(fetch.mock.calls.length).toEqual(1)
    console.log(fetch.mock)
    screen.debug()
  })
})
