'use client'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Header } from './components/header'
import ContextProvider from '@/context'
import localFont from 'next/font/local'
import { NextUIProvider } from '@nextui-org/react'
import { useClient } from '@/hooks'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })
export const Go3 = localFont({
  src: '../assets/font/go3v2.ttf',
})
export const Bangkok = localFont({
  src: '../assets/font/bangkok.ttf',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isClient = useClient()

  if (!isClient) {
    return <html lang='en'>
      <body></body>
    </html>
  }

  return (
    <html lang='en'>
      <NextUIProvider>
        <ContextProvider>
          <body className={`${roboto.className} bg-[#860204] overflow-x-hidden w-[100vw] min-h-[100dvh] min-w-[375px]`}>
            <Header />
            <main className='relative pb-20 md:pb-0'>{children}</main>
          </body>
        </ContextProvider>
      </NextUIProvider>
    </html>
  )
}
