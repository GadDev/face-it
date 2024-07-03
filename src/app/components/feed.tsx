'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import type { Post } from '@/lib/features/api/types'
import {
  useGetPostsQuery,
  useAddNewPostMutation,
  apiSlice,
} from '@/lib/features/api/apiSlice'
import { setUserNavigation } from '@/lib/features/userNavigation/userNavigationSlice'
import { v4 as uuidv4 } from 'uuid'
import { PostItem } from './post-item'
import { ScrollToTopButton } from './scroll-to-top-btn'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/lib/store'
import { Error } from '@/components/error'
import { useToast } from '@/components/ui/use-toast'

import { UnknownAction } from '@reduxjs/toolkit'
import { socket } from '../../socket'
import { useRouter } from 'next/navigation'
import PostUpdater from './post-updater'

export const Feed = () => {
  const { toast } = useToast()

  const { push } = useRouter()
  const userNavigationSelector = (state: RootState) => state.userNavigation
  const userPosition = useSelector(userNavigationSelector)

  const [page, setPage] = useState(userPosition?.page)
  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(
    null,
  )
  const [posts, setPosts] = useState<Post[]>([])
  const totalPosts = useRef(0)

  // const page = useRef(1)

  const dispatch = useDispatch()

  // Conditionally skip the query if the data for the current page is already loaded
  // const skipQuery = posts.length > 0 && posts.length >= page * 20
  // console.log('skipQuery', skipQuery)
  const { data, error, isLoading, isFetching } = useGetPostsQuery(page)
  // const [addNewPost] = useAddNewPostMutation()
  // console.log('data', data)

  //Merge new data with existing posts
  // useEffect(() => {
  //   console.log('hello 2', data)
  //   if (data?.posts) {
  //     setPosts((prevPosts) => {
  //       const newPosts = data.posts.filter(
  //         (newPost: any) => !prevPosts.some((post) => post.id === newPost.id),
  //       )
  //       return [...prevPosts, ...newPosts]
  //     })
  //     totalPosts.current = data.totalCount
  //   }
  // }, [data])

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement

      if (
        scrollTop + clientHeight >= scrollHeight - 200 &&
        !isFetching &&
        data?.posts &&
        data.posts.length < data?.totalCount
      ) {
        console.log('hello')
        // page.current++
        setPage(page + 1)
        dispatch(setUserNavigation({ scrollY: window.scrollY, page: page + 1 }))
      }
    }

    window.addEventListener('scroll', handleScroll)

    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [data])

  // Highlight new posts
  // useEffect(() => {
  //   console.log('hello 4', data)
  //   if (posts.length) {
  //     const newPostIds = posts
  //       .filter((post: any) => Date.now() - post.timestamp < 5000)
  //       .map((post) => post.id)

  //     setHighlightedPostId(newPostIds[0])
  //     const timer = setTimeout(() => setHighlightedPostId(null), 3000)

  //     return () => clearTimeout(timer)
  //   }
  // }, [posts])

  // Handle incoming socket messages
  // useEffect(() => {
  //   const handleNewPost = (newPost: Post) => {
  //     console.log('newPost', newPost)
  //     dispatch(
  //       apiSlice.util.updateQueryData('getPosts', 0, (draft) => {
  //         draft.posts.unshift(newPost)
  //         // Ensure the total count is not exceeded
  //         if (draft.posts.length > draft.totalCount) {
  //           draft.posts.pop()
  //         }
  //       }) as unknown as UnknownAction,
  //     )
  //   }

  //   // Listen for 'newPost' events
  //   socket.on('newPost', handleNewPost)

  //   // Cleanup function to remove event listeners
  //   return () => {
  //     socket.off('newPost', handleNewPost)
  //   }
  // }, [dispatch])

  // Emit new post every 10 seconds
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const newPost: Post = {
  //       id: Date.now(), // Use a timestamp as a temporary unique ID
  //       title: 'Automatically generated post',
  //       body: 'This is an automatic post generated every 10 seconds.',
  //       userId: 1,
  //       timestamp: Date.now(),
  //     }

  //     addNewPost(newPost)
  //       .unwrap()
  //       .then((payload) => {
  //         socket.emit('newPost', payload)
  //         dispatch(
  //           apiSlice.util.updateQueryData('getPosts', 0, (draft) => {
  //             draft.posts.unshift(newPost)
  //             // Ensure the total count is not exceeded
  //             if (draft.posts.length > draft.totalCount) {
  //               draft.posts.pop()
  //             }
  //           }) as unknown as UnknownAction,
  //         )

  //         toast({
  //           title: 'New Post added',
  //           description: payload.timestamp,
  //         })
  //       })
  //   }, 10000)

  //   return () => clearInterval(intervalId)
  // }, [addNewPost, toast])

  // Restore scroll position on initial load
  useEffect(() => {
    console.log('hello 1', userPosition)
    window.scrollTo(0, userPosition.scrollY)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPosition])

  const handleNavigation = (id: any) => {
    push(`/posts/${id}`)
    dispatch(setUserNavigation({ scrollY: window.scrollY, page }))
  }

  if (isLoading && page === 1) {
    return (
      <div className="flex flex-1 items-center">
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
        Loading...
      </div>
    )
  }
  if (error) return <Error />

  if (!data?.posts.length) return <div>No posts found</div>

  return (
    <>
      {data?.posts.map((post: Post, index: number) => (
        <article
          key={`post-${uuidv4()}`}
          onClick={() => handleNavigation(post.id)}
        >
          <PostItem
            title={post.title}
            body={post.body}
            userId={post.userId}
            highlighted={highlightedPostId === post.id}
          />
        </article>
      ))}
      {isFetching && (
        <div style={{ textAlign: 'center', margin: '30px' }}>
          Loading more posts...
        </div>
      )}
      <ScrollToTopButton />
    </>
  )
}
