import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { prependNewPost } from '@/lib/features/newPosts/newPostsSlice'
import { Post } from '@/lib/features/api/types'
import { socket } from '../../socket'
import { useToast } from '@/components/ui/use-toast'
import { RootState } from '@/lib/store'
import { PostItem } from './post-item'

let postId = 101 // Assuming 100 posts already exist

const simulateNewPost = () => {
  const newPost = {
    id: postId++,
    userId: 1,
    title: `New Post ${postId}`,
    body: 'This is a new post.',
  }
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
  const newPosts = useSelector(newPostsSelector)

  const [highlightedPostId, setHighlightedPostId] = useState(null)

  useEffect(() => {
    socket.on('new_post', (post) => {
      dispatch(prependNewPost(post))
      setHighlightedPostId(post.id)
      toast({
        title: 'New Post added',
        description: post.title,
      })

      setTimeout(() => setHighlightedPostId(null), 3000) // Remove highlight after 3 seconds
    })

    const interval = setInterval(simulateNewPost, 10000)

    return () => {
      socket.off('new_post')
      clearInterval(interval)
    }
  }, [dispatch, socket])

  console.log('newPosts', newPosts)

  return (
    <>
      {newPosts.map((post: Post, index: number) => (
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
