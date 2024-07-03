import { render, screen } from '@testing-library/react'
import { PostItem } from '../../src/app/components/post-item'
import { use } from 'react'

describe('PostItem', () => {
  const post = {
    title: 'Sample Title',
    body: 'This is a sample body for the post. It should be truncated if too long.',
    userId: 1,
    highlighted: false,
  }

  test('renders PostItem component', () => {
    render(
      <PostItem
        highlighted={post.highlighted}
        title={post.title}
        body={post.body}
        userId={post.userId}
      />,
    )

    // Check if fallback text for avatar is present
    const avatarFallback = screen.getByText('JD')
    expect(avatarFallback).toBeInTheDocument()

    // Check if author name is present
    const authorName = screen.getByRole('heading', {
      level: 3,
      name: /John Doe/i,
    })
    expect(authorName).toBeInTheDocument()

    // Check if author role is present
    const authorRole = screen.getByText('Author')
    expect(authorRole).toBeInTheDocument()

    // Check if post title is present
    const postTitle = screen.getByRole('heading', {
      level: 2,
      name: /Sample Title/i,
    })
    expect(postTitle).toBeInTheDocument()

    // Check if post body is present
    const postBody = screen.getByText(
      /This is a sample body for the post. It should be truncated if too long.../i,
    )
    expect(postBody).toBeInTheDocument()
  })
})
