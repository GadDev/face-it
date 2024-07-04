import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../api/types'

export const newPostsSlice = createSlice({
  name: 'newPosts',
  initialState: [] as Post[],
  reducers: {
    prependNewPost: (state, action: PayloadAction<Post>) => {
      state.unshift(action.payload)
    },
  },
})

export const { prependNewPost } = newPostsSlice.actions

export default newPostsSlice.reducer
