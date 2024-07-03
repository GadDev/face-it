import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-bold">Not found</h1>
      </div>
      <div className="space-y-4 text-center">
        <h2 className="text-9xl font-bold">404</h2>
        <p className="text-muted-foreground">
          Oops, the page you were looking for could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
