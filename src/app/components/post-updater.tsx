'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAddNewPostMutation, apiSlice } from '@/lib/features/api/apiSlice'
import { Post } from '@/lib/features/api/types'
import { socket } from '../../socket'
import { useToast } from '@/components/ui/use-toast'

const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const intervalId = setInterval(callback, delay)
    return () => clearInterval(intervalId)
  }, [callback, delay])
}

const PostUpdater = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const [addNewPost] = useAddNewPostMutation()

  useEffect(() => {
    socket.on('post', (value) =>
      console.log(`Hello ${JSON.stringify(value, null, 2)}`),
    )
    const interval = setInterval(() => {
      const newPost: Post = {
        id: Date.now(), // Use a timestamp as a temporary unique ID
        title: 'Automatically generated post',
        body: 'This is an automatic post generated every 10 seconds.',
        userId: 1,
        timestamp: Date.now(),
      }

      addNewPost(newPost)

      console.log('interval')
      socket.emit('post', newPost)
    }, 1000)
    // socket.emit('post', 'newPczost')
    return () => {
      clearInterval(interval)
      socket.off('post')
    }
  })

  // useInterval(() => {
  //   const newPost: Post = {
  //     id: Date.now(), // Use a timestamp as a temporary unique ID
  //     title: 'Automatically generated post',
  //     body: 'This is an automatic post generated every 10 seconds.',
  //     userId: 1,
  //     timestamp: Date.now(),
  //   }

  //   socket.on('post', (value) => {
  //     console.log('value post', value)
  //   })

  //   socket.emit('post', 'newPost')

  //   socket.on('hello', (value) => {
  //     console.log('value', value)
  //   })

  //   socket.emit('hello', 'newPost')

  //   // socket.on('newPost', (newPost: Post) => {
  //   //   addNewPost(newPost)
  //   //     .unwrap()
  //   //     .then((payload) => {
  //   //       // Update the local state with the new post
  //   //       // dispatch(
  //   //       //   apiSlice.util.updateQueryData('getPosts', 0, (draft) => {
  //   //       //     draft.posts.unshift(payload as Post)
  //   //       //     // Ensure the total count is not exceeded
  //   //       //     if (draft.posts.length > draft.totalCount) {
  //   //       //       draft.posts.pop()
  //   //       //     }
  //   //       //   }) as any,
  //   //       // )

  //   //       toast({
  //   //         title: 'New Post added',
  //   //         description: payload.timestamp,
  //   //       })
  //   //     })
  //   //     .finally(() => {
  //   //       // Emit a socket message after the new post is added
  //   //       socket.emit('newPost', newPost)
  //   //     })
  //   // })
  //   // addNewPost(newPost)
  //   //   .unwrap()
  //   //   .then((payload) => {
  //   //     // Update the local state with the new post
  //   //     // dispatch(
  //   //     //   apiSlice.util.updateQueryData('getPosts', 0, (draft) => {
  //   //     //     draft.posts.unshift(payload as Post)
  //   //     //     // Ensure the total count is not exceeded
  //   //     //     if (draft.posts.length > draft.totalCount) {
  //   //     //       draft.posts.pop()
  //   //     //     }
  //   //     //   }) as any,
  //   //     // )

  //   //     toast({
  //   //       title: 'New Post added',
  //   //       description: payload.timestamp,
  //   //     })
  //   //   })
  //   //   .finally(() => {
  //   //     // Emit a socket message after the new post is added
  //   //     socket.emit('newPost', newPost)
  //   //   })
  // }, 1000)

  return null // This component does not render anything
}

export default PostUpdater
