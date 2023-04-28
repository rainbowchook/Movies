import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import FilmRow from './FilmRow'

export const mockResponseData = {
  results: [
    {
      "id": 346364,
      "title": "It",
      "poster_path": "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
      "backdrop_path": "/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg",
      "overview": "Mock IT overview",
      "tagline": "Mock IT tagline",
      "release_date": "2017-09-05",
    },
    {
      "id": 343668,
      "title": "Kingsman: The Golden Circle",
      "poster_path": "/pKESfn2Pdy0b7drvZHQb7UzgqoY.jpg",
      "backdrop_path": "/uExPmkOHJySrbJyJDJylHDqaT58.jpg",
      "overview": "Mock Kingsman overview",
      "release_date": "2017-09-20"
    }
  ]
}

describe('FilmRow rendered correctly depending on props', () => {
  test('renders film details correctly when not favourited', async () => {

    const handleClick = jest.fn()

    render(
      <FilmRow film={mockResponseData.results[0]} handleClick={handleClick} favourite={false} />,
      {wrapper: BrowserRouter}
    )

    const {id, title, poster_path, release_date} = mockResponseData.results[0]
    // screen.debug()
    // const img = await screen.findByAltText(`${title} film poster`)
    const img = await screen.findByAltText(new RegExp(title, 'i'))
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toMatch(new RegExp(poster_path, "i"))
    //cannot use regex with this method; must be exact string:
    // expect(img).toHaveAttribute('src', `https://image.tmdb.org/t/p/w780${poster_path}`)
    expect(screen.getByText(title, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(new Date(release_date).getFullYear())).toBeInTheDocument()

    const favouriteSpan = screen.getByTestId('favourite-span')
    expect(favouriteSpan).toBeInTheDocument()
    expect(favouriteSpan).toHaveTextContent('add_to_queue')

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/films/${id}`
    )
  })

  test('renders film details correctly when favourited', async () => {

    const handleClick = jest.fn()

    render(
      <BrowserRouter>
        <FilmRow film={mockResponseData.results[1]} handleClick={handleClick} favourite={true} />
      </BrowserRouter>

    )
    const {id, title, poster_path, release_date} = mockResponseData.results[1]
    // screen.debug()
    const img = await screen.findByAltText(new RegExp(title, 'i'))
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toMatch(new RegExp(poster_path, "i"))
    expect(screen.getByText(title, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(new Date(release_date).getFullYear())).toBeInTheDocument()

    // screen.debug()

    const favouriteSpan = screen.getByTestId('favourite-span')
    expect(favouriteSpan).toBeInTheDocument()
    expect(favouriteSpan).toHaveTextContent('remove_from_queue')

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      'href',
      `/films/${id}`
    )
  })
})

describe('Clicking on Favourite button', () => {
  test('calls handleClick when favourite button clicked', () => {

    const handleClick = jest.fn()

    render(
      <BrowserRouter>
        <FilmRow film={mockResponseData.results[0]} handleClick={handleClick} favourite={false} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
