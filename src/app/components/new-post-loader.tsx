import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { prependNewPost } from '@/lib/features/newPosts/newPostsSlice'
import { Post } from '@/lib/features/api/types'
import { socket } from '../../socket'
import { useToast } from '@/components/ui/use-toast'
import { RootState } from '@/lib/store'
import { PostItem } from './post-item'

const simulateNewPost = (postId: number) => (cb: any) => {
  const newPost = {
    id: postId,
    userId: Math.floor(Math.random() * 10) + 1,
    title: `New Post ${postId}`,
    body: 'This is a new post.',
  }
  cb(postId)
  postId++

  socket.emit('new_post', newPost)
}

export const NewPostsLoader = ({
  handleRedirection,
}: {
  handleRedirection: (arg: number) => void
}) => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const newPostsSelector = (state: RootState) => state.newPosts
  const newPosts: Post[] = useSelector(newPostsSelector)

  const [highlightedPostId, setHighlightedPostId] = useState(null)

  useEffect(() => {
    const generatePost = simulateNewPost(101) // Assuming 100 posts already exist

    socket.on('new_post', (post) => {
      dispatch(prependNewPost(post))
      toast({
        title: 'New Post added',
        description: post.title,
      })

      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedPostId(null)
      }, 3000)
    })

    const interval = setInterval(
      () => generatePost(setHighlightedPostId),
      10000,
    )

    return () => {
      socket.off('new_post')
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {newPosts.map((post) => (
        <article
          key={`post-${post.id}`}
          onClick={() => handleRedirection(post.id)}
        >
          <PostItem
            title={post.title}
            body={post.body}
            userId={post.userId}
            highlighted={highlightedPostId === post.id}
          />
        </article>
      ))}
    </>
  )
}
