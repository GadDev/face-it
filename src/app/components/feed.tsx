'use client'


import { useState, useEffect } from 'react'
import type { Post } from '@/lib/features/api/types'
import {
  useGetPostsQuery,
} from '@/lib/features/api/apiSlice'
import { setUserNavigation } from '@/lib/features/userNavigation/userNavigationSlice'
import { v4 as uuidv4 } from 'uuid'
import { PostItem } from './post-item'
import { ScrollToTopButton } from './scroll-to-top-btn'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/lib/store'
import { Error } from '@/components/error'
import { useRouter } from 'next/navigation'
import { NewPostsLoader } from './new-post-loader'

export const Feed = () => {
  const { push } = useRouter()
  const userNavigationSelector = (state: RootState) => state.userNavigation
  const userPosition = useSelector(userNavigationSelector)

  const [page, setPage] = useState(userPosition?.page)
  const dispatch = useDispatch()
  const { data, error, isLoading, isFetching } = useGetPostsQuery(page)

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

  // Restore scroll position on initial load
  useEffect(() => {
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
      <NewPostsLoader handleRedirection={handleNavigation} />
      {data?.posts.map((post: Post, index: number) => (
        <article
          key={`post-${uuidv4()}`}
          onClick={() => handleNavigation(post.id)}
        >
          <PostItem
            title={post.title}
            body={post.body}
            userId={post.userId}
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
