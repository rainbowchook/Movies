import {render, screen} from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('App displays home page', () => {
    render(<App />)
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument()
  })
})
