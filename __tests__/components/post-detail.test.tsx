import { http, HttpResponse, delay } from 'msw'
import { server } from '../../mocks/node'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../src/utils/test-utils'
import { PostDetail } from '../../src/app/posts/[id]/components/post-detail'

const mockUser = {
  id: 1,
  name: 'John Smith',
  username: 'johnsmith',
  email: 'jo@jo.com',
  address: 'address',
  phone: '123456',
  website: 'www.johnsmith.com',
  company: 'company',
}

const mockPost = {
  userId: 1,
  id: 1,
  title: 'post title',
  body: 'post body',
}
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users/1', async () => {
    await delay(150)
    return HttpResponse.json('John Smith')
  }),
]

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

describe('PostDetail Component', () => {
  it('renders loading state', () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users**', async () => {
        await delay(150)
        return HttpResponse.json(mockUser)
      }),
      http.get('https://jsonplaceholder.typicode.com/posts**', async () => {
        await delay(150)
        return HttpResponse.json(mockPost)
      }),
    )

    renderWithProviders(<PostDetail id={1} />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders error state', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users**', () => {
        return new HttpResponse('Internal Server Error', {
          status: 500,
        })
      }),
      http.get('https://jsonplaceholder.typicode.com/posts**', () => {
        return new HttpResponse('Internal Server Error', {
          status: 500,
        })
      }),
    )

    renderWithProviders(<PostDetail id={1} />)

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

  it('renders post details', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users**', async () => {
        await delay(150)
        return HttpResponse.json(mockUser)
      }),
      http.get('https://jsonplaceholder.typicode.com/posts**', async () => {
        await delay(150)
        return HttpResponse.json(mockPost)
      }),
    )

    renderWithProviders(<PostDetail id={1} />)

    await waitFor(() => {
      screen.getByRole('heading', { level: 1, name: /John Smith/i })
    })

    expect(
      screen.getByRole('heading', { level: 1, name: /post title/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/post body/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /back to posts/i }),
    ).toBeInTheDocument()
  })
})
