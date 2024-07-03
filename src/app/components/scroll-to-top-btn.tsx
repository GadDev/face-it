'use client'

import { useState, useEffect } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { setUserNavigation } from '@/lib/features/userNavigation/userNavigationSlice'

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const userNavigationSelector = (state: RootState) => state.userNavigation
  const userPosition = useSelector(userNavigationSelector)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
    dispatch(setUserNavigation({ scrollY: 0, page: userPosition?.page }))
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4">
      {visible && (
        <button
          onClick={scrollToTop}
          className="rounded-full bg-gray-700 p-2 text-white shadow-lg"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
function userNavigationSelector(state: unknown): unknown {
  throw new Error('Function not implemented.')
}
