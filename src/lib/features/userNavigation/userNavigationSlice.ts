// src/store/scrollSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserNavigationState {
  scrollY: number
  page: number
}

export const initialState: UserNavigationState = {
  scrollY: 0,
  page: 1,
}

export const userNavigationSlice = createSlice({
  name: 'userNavigation',
  initialState,
  reducers: {
    setUserNavigation(state, action: PayloadAction<UserNavigationState>) {
      state.scrollY = action.payload.scrollY
      state.page = action.payload.page
    },
  },
})

export const { setUserNavigation } = userNavigationSlice.actions
export default userNavigationSlice.reducer
