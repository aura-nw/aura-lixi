'use client'
import ContextProvider from '@/context'
import { useClient } from '@/hooks'
import { NextUIProvider } from '@nextui-org/react'
import { Roboto } from 'next/font/google'
import { Header } from './components/header'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isClient = useClient()
  if (!isClient) {
    return (
      <html lang='en'>
        <body></body>
      </html>
    )
  }

  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-[#860204] overflow-x-hidden w-[100vw] min-h-[100dvh] min-w-[375px]`}>
        <NextUIProvider>
          <ContextProvider>
            <Header />
            <main className='relative pb-20 md:pb-0'>{children}</main>
          </ContextProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
