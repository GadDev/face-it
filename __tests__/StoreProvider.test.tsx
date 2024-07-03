import { render, screen } from '@testing-library/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import StoreProvider from '../src/app/StoreProvider'
import { makeStore } from '../src/lib/store'
import exp from 'constants'

jest.mock('@reduxjs/toolkit/query', () => ({
  setupListeners: jest.fn(),
}))

const spySubscribers = jest.fn()
const spyGetState = jest.fn()
jest.mock('../src/lib/store', () => ({
  makeStore: jest.fn(() => ({
    dispatch: jest.fn(),
    getState: spyGetState,
    subscribe: spySubscribers,
  })),
}))

describe('StoreProvider Component', () => {
  test('renders children and sets up the Redux store', () => {
    const { getByText } = render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>,
    )

    // Check if the child component is rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument()

    // Check if the store was created
    expect(makeStore).toHaveBeenCalled()

    // Check if the listeners were set up
    expect(setupListeners).toHaveBeenCalledWith(expect.any(Function))

    expect(spySubscribers).toHaveBeenCalled()
    expect(spyGetState).toHaveBeenCalled()
    expect(spySubscribers).toHaveBeenCalledWith(expect.any(Function))
  })
})
