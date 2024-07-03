'use client'

import { TriangleAlertIcon } from 'lucide-react'

const Error = () => {
  return (
    <div className="pt-15 flex flex-col items-center justify-center gap-6">
      <div className="rounded-full bg-red-100 p-4 text-red-500">
        <TriangleAlertIcon className="h-8 w-8" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold">Oops, something went wrong!</h1>
        <p className="max-w-sm text-sm text-gray-500">
          We&apos;re sorry, but there seems to be an issue with your request.
          Please try again later or contact our support team if the problem
          persists.
        </p>
      </div>
    </div>
  )
}

Error.displayName = 'Error'

export { Error }
