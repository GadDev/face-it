import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScrollToTopButton from '../../src/app/components/scroll-to-top-btn'

const spyScrollTo = jest.fn()
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo })

describe.skip('ScrollToTopButton', () => {
  it('button should not be visible on initial render', () => {
    render(<ScrollToTopButton />)
    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })

  it('button should appear after scrolling down', async () => {
    render(<ScrollToTopButton />)

    // Simulate scrolling
    fireEvent.scroll(window, { target: { scrollY: 301 } })

    const button = await screen.findByRole('button')
    expect(button).toBeInTheDocument()
  })

  test('clicking button scrolls to top', async () => {
    render(<ScrollToTopButton />)

    // Simulate scrolling
    fireEvent.scroll(window, { target: { scrollY: 301 } })

    const button = await screen.findByRole('button')
    await userEvent.click(button)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 })
  })
})
