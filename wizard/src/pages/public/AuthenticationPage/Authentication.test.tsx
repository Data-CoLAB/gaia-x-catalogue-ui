import AuthenticationPage from './Authentication.page'
import { render, screen } from '@testing-library/react'

describe('Describe', () => {
  it('render correctly auth page', () => {
    render(<AuthenticationPage />)
    expect(screen.getByText(/Login/i))
  })
})
