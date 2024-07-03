import { render, screen } from '@testing-library/react'
import NotFound from '../src/app/not-found'

describe('NotFound Page', () => {
  test('renders correctly', async () => {
    render(<NotFound />)

    // Check for the main heading
    expect(
      screen.getByRole('heading', { level: 1, name: /not found/i }),
    ).toBeInTheDocument()

    // Check for the secondary heading
    expect(
      screen.getByRole('heading', { level: 2, name: /404/i }),
    ).toBeInTheDocument()

    // Check for the paragraph
    expect(
      screen.getByText(
        /oops, the page you were looking for could not be found/i,
      ),
    ).toBeInTheDocument()

    // Check for the link back to home
    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
