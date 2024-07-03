import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useTheme } from 'next-themes'
import { ModeToggle } from '../../src/components/mode-toggle' // Adjust the import path as necessary

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))


describe('ModeToggle Component', () => {
  let setTheme: jest.Mock

  beforeEach(() => {
    setTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({ setTheme })
  })

  test('renders the toggle button and dropdown items', async () => {
    render(<ModeToggle />)

    // Check if the button is rendered
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()

    // Open the dropdown menu
    await userEvent.click(button)

    // Check if the dropdown items are rendered
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })

  test('calls setTheme with "light" when Light is clicked', async () => {
    render(<ModeToggle />)

    // Open the dropdown menu
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))

    // Click on the "Light" item
    await userEvent.click(screen.getByText('Light'))

    // Check if setTheme is called with 'light'
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  test('calls setTheme with "dark" when Dark is clicked', async () => {
    render(<ModeToggle />)

    // Open the dropdown menu
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))

    // Click on the "Dark" item
    await userEvent.click(screen.getByText('Dark'))

    // Check if setTheme is called with 'dark'
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  test('calls setTheme with "system" when System is clicked', async () => {
    render(<ModeToggle />)

    // Open the dropdown menu
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))

    // Click on the "System" item
    await userEvent.click(screen.getByText('System'))

    // Check if setTheme is called with 'system'
    expect(setTheme).toHaveBeenCalledWith('system')
  })
})
