import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { socket } from '../../src/socket'
import { prependNewPost } from '@/lib/features/newPosts/newPostsSlice'
import { useToast } from '@/components/ui/use-toast'
import { renderWithProviders } from '../../src/utils/test-utils'
import { NewPostsLoader } from '../../src/app/components/new-post-loader'

// Mocking necessary parts

jest.mock('../../src/socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}))

jest.mock('../../src/components/ui/use-toast', () => ({
  useToast: jest.fn().mockReturnValue({
    toast: jest.fn(),
  }),
}))

// Mock initial Redux state
const mockInitialState = {
  newPosts: [],
}

describe('NewPostsLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the component and display new posts', async () => {
    const mockPost = {
      id: 101,
      userId: 1,
      title: 'New Post 101',
      body: 'This is a new post.',
    }

    // socket.on.mockImplementation((event, callback) => {
    //   if (event === 'new_post') {
    //     callback(mockPost)
    //   }
    // })

    const handleRedirection = jest.fn()

    renderWithProviders(
      <NewPostsLoader handleRedirection={handleRedirection} />,
      { preloadedState: mockInitialState },
    )

    await waitFor(() => {
      expect(screen.getByText('New Post 101')).toBeInTheDocument()
    })

    expect(screen.getByText('This is a new post.')).toBeInTheDocument()
  })
})
