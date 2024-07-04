'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeftIcon } from 'lucide-react'
import { useGetPostQuery, useGetUserQuery } from '@/lib/features/api/apiSlice'
import { Error } from '@/components/error'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

export const PostDetail = ({ id }: { id: number }) => {
  const newPostsSelector = (state: RootState) => state.newPosts
  const newPosts = useSelector(newPostsSelector)

  const { data, error, isLoading } = useGetPostQuery(id)
  const { data: user } = useGetUserQuery(data?.userId || 1)

  const postFromNewPosts = newPosts.find((post) => post.id === id)
  const post = error ? postFromNewPosts : data

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center">
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
        Loading...
      </div>
    )
  }

  if (error && !post) return <Error />

  return (
    <>
      <div className="flex items-center justify-start px-4 py-8 md:px-6 md:py-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground underline-offset-4 hover:underline"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-sm">Back to posts</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6 flex flex-col items-center">
          <Avatar className="mb-2">
            <AvatarImage src={`https://i.pravatar.cc/150?img=${post.userId}`} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold md:text-3xl">{user?.name}</h1>
            <p className="text-muted-foreground">Author</p>
          </div>
        </div>
        <article className="prose prose-gray dark:prose-invert max-w-2xl">
          <h1 className="md:text-3x m-5 text-2xl font-bold ">{post.title}</h1>
          <p>{post.body}</p>
        </article>
      </div>
    </>
  )
}
