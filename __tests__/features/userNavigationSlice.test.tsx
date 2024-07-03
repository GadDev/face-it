import reducer, {
  initialState,
  setUserNavigation,
} from '../../src/lib/features/userNavigation/userNavigationSlice'
import type { UserNavigationState } from '../../src/lib/features/userNavigation/userNavigationSlice'
test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual({
    scrollY: 0,
    page: 1,
  })
})

test('should handle state to be modify', () => {
  const previousState: UserNavigationState = {
    scrollY: 0,
    page: 1,
  }

  const nextState: UserNavigationState = {
    scrollY: 10,
    page: 2,
  }

  expect(reducer(previousState, setUserNavigation(nextState))).toEqual(
    nextState,
  )
})
