import { Roboto } from 'next/font/google'
import './globals.css'
import { Header } from './components/header'
import ContextProvider from '@/context'
import localFont from 'next/font/local'

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
  return (
    <html lang='en'>
      <ContextProvider>
        <body className={`${roboto.className} bg-[#860204] overflow-x-hidden w-[100vw] min-h-[100dvh] min-w-[375px]`}>
          <Header />
          <main className='relative pb-20'>{children}</main>
        </body>
      </ContextProvider>
    </html>
  )
}
