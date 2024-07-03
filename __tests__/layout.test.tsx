import { render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import RootLayout from '../src/app/layout'
import { wrap } from 'module'
import { useDispatch, useStore } from 'react-redux'

jest.mock('next-themes', () => ({
  ThemeProvider: jest.fn(({ children }) => <>{children}</>),
  useTheme: jest.fn(),
}))

jest.mock('react-redux', () => ({
  Provider: jest.fn(({ children }) => <>{children}</>),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  useStore: jest.fn(),
}))

describe('RootLayout Component', () => {
  let setTheme: jest.Mock

  beforeEach(() => {
    setTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({ setTheme })
  })

  test('renders the RootLayout component with correct content', () => {
    render(<RootLayout>Test Child Content</RootLayout>)

    // Check if the StoreProvider is rendered (this can be implicit by checking a child element)
    expect(screen.getByText('FACEIT Group')).toBeInTheDocument()

    // Check if the ThemeProvider is rendered (this can be implicit by checking a child element)
    expect(screen.getByText('Test Child Content')).toBeInTheDocument()

    // Check if the ModeToggle component is rendered
    expect(
      screen.getByRole('button', { name: /Toggle theme/i }),
    ).toBeInTheDocument()

    // Check if the GamepadIcon is rendered (by checking the associated text)
    expect(screen.getByText('FACEIT Group')).toBeInTheDocument()

    // Check if the footer text is rendered
    expect(screen.getByText(/© 2024 FACEIT Group/i)).toBeInTheDocument()
  })
})
