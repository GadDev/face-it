import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../src/components/theme-provider' // Adjust the import path as necessary
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Mock the next-themes ThemeProvider
jest.mock('next-themes', () => ({
  ThemeProvider: jest.fn(({ children }) => <div>{children}</div>),
}))


describe('ThemeProvider Component', () => {
  test('renders children and passes props to NextThemesProvider', () => {
    const props = {
      attribute: 'class',
      defaultTheme: 'light',
      enableSystem: true,
    }

    render(
      <ThemeProvider {...props}>
        <div>Test Child</div>
      </ThemeProvider>,
    )

    // Check if the child component is rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument()

    // Check if NextThemesProvider is called with correct props
    expect(NextThemesProvider).toHaveBeenCalledWith(
      expect.objectContaining(props),
      {},
    )
  })
})
