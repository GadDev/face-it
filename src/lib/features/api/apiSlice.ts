// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppDispatch } from '../../store'
import { Post, PostsResponse, User } from './types'
import { Users } from 'lucide-react'
import { getSuggestedQuery } from '@testing-library/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'jsonplaceholder',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Posts', 'Post'],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query<PostsResponse, number | void>({
      // The URL for the request is '/fakeApi/posts'
      query: (page = 1) => `posts?_page=${page}&_limit=20`,
      providesTags: (result, error, page) =>
        result
          ? [
              // Provides a tag for each post in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.posts.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.posts.push(...newItems.posts)
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      transformResponse: (response: Post[], meta) => {
        const totalCount = parseInt(
          meta?.response?.headers.get('x-total-count') ?? '0',
          10,
        )
        return { posts: response, totalCount: totalCount }
      },
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `post/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `listPosts` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (result, error, id) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'PARTIAL-LIST' },
      ],
    }),
    getUsers: builder.query<User[], void>({
      // The URL for the request is '/fakeApi/users'
      query: () => '/users',
    }),
    getUser: builder.query<User, number>({
      query: (userId) => `/users/${userId}`,
    }),
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewPostMutation,
} = apiSlice

export const prependNewPost = (post: Post) => (dispatch: AppDispatch) => {
  const newPost = { ...post, timestamp: Date.now() }
  dispatch(
    apiSlice.util.updateQueryData('getPosts', 0, (draft) => {
      draft.posts.unshift(newPost)
      draft.totalCount++
    }),
  )
}
