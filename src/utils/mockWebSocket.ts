import { prependNewPost } from '@/lib/features/api/apiSlice'
import type { Post } from '@/lib/features/api/types'
import type { AppDispatch } from '@/lib/store'



const generateRandomPost = (id: number): Post => {
  return {
    id,
    userId: 1,
    title: `Random Post ${id}`,
    body: 'This is a random post generated for simulation purposes.',
  }
}

export const setupMockWebSocket = (dispatch: AppDispatch) => {
  let id = 101 // Assuming you already have 100 posts
  return setInterval(() => {
    const newPost = generateRandomPost(id++)
    dispatch(prependNewPost(newPost))
  }, 10000) // Simulate a new post every 10 seconds
}
