import type { Metadata } from 'next'
import Link from 'next/link'
import { GamepadIcon } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import StoreProvider from './StoreProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'FaceIT',
  description: 'A simple web app with next.js and redux toolkit ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en" className="h-full bg-gray-50">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid min-h-screen w-full dark:bg-black">
              <div className="flex flex-col">
                <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
                  <Link
                    className="flex items-center gap-2 font-semibold"
                    href="/"
                  >
                    <GamepadIcon className="h-4 w-4" />
                    <span className="">FACEIT Group</span>
                  </Link>
                  <ModeToggle />
                </header>
                <div className="flex-1 overflow-y-auto">{children}</div>
              </div>
            </div>
            <footer className="border-t bg-gray-100/40 p-4 text-xs text-muted-foreground dark:bg-black md:p-6">
              <div className="mx-auto flex justify-start">
                <p>&copy; 2024 FACEIT Group</p>
              </div>
            </footer>
          </ThemeProvider>
          <SpeedInsights />
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  )
}
