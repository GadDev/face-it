import { http, HttpResponse, delay } from 'msw'
import { server } from '../../mocks/node'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../src/utils/test-utils'
import { Feed } from '../../src/app/components/feed'

const spyScrollTo = jest.fn()
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo })

jest.mock('uuid', () => ({ v4: () => '123456789' }))

const mockPosts = {
  posts: [
    {
      userId: 1,
      id: 1,
      title: 'post title',
      body: 'post body',
    },
    {
      userId: 2,
      id: 2,
      title: 'post title 2',
      body: 'post body 2',
    },
  ],
  totalCount: 100,
}

// Mock initial Redux state
const mockInitialState = {
  userNavigation: {
    page: 1,
    scrollY: 0,
  },
}

// Enable API mocking before tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest(request, print) {
      // Do not print warnings on unhandled requests to https://<:userId>.ingest.us.sentry.io/api/
      // Note: a request handler with passthrough is not suited with this type of url
      //       until there is a more permissible url catching system
      //       like requested at https://github.com/mswjs/msw/issues/1804
      if (request.url.includes('jsonplaceholder.typicode.com')) {
        return
      }

      // Print the regular MSW unhandled request warning otherwise.
      print.warning()
    },
  }),
)

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Feed Component', () => {
  it('renders loading state', () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts**', async () => {
        await delay(150)
        return HttpResponse.json(mockPosts)
      }),
    )

    renderWithProviders(<Feed />, { preloadedState: mockInitialState })

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders error state', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts**', () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<Feed />, { preloadedState: mockInitialState })

    await waitFor(() => {
      screen.getByText(
        /We're sorry, but there seems to be an issue with your request. Please try again later or contact our support team if the problem persists./i,
      )
    })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /oops, something went wrong!/i,
      }),
    ).toBeInTheDocument()
  })
})
