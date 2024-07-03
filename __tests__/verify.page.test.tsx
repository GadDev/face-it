import { render, screen } from '@testing-library/react'

import VerifyPage from '../src/app/verify/page' // Adjust the import path as necessary

describe('VerifyPage Component', () => {
  test('renders the VerifyPage component with correct content', () => {
    render(<VerifyPage />)

    // Check if the main heading is rendered
    expect(screen.getByText('Verify page')).toBeInTheDocument()

    // Check if the paragraph is rendered
    expect(
      screen.getByText(
        'This page is intended to verify that Redux state is persisted across page navigations.',
      ),
    ).toBeInTheDocument()
  })
})
