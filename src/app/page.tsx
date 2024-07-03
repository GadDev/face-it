'use client'

import { useEffect, useState } from 'react'
import { socket } from '../socket'

import { Feed } from './components/feed'
import { apiSlice, useAddNewPostMutation } from '@/lib/features/api/apiSlice'
import { useDispatch } from 'react-redux'
import { Post } from '@/lib/features/api/types'

const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const intervalId = setInterval(callback, delay)
    return () => clearInterval(intervalId)
  }, [callback, delay])
}

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-7 px-4 py-2 md:px-1 md:py-2 lg:py-2">
            <h1 className="text-lg font-semibold md:text-2xl">Feed</h1>
            <Feed />
          </div>
        </section>
      </main>
    </div>
  )
}
