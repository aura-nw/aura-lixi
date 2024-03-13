import ContextProvider from '@/provider'
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '@/components/header'
import './globals.css'
import Image from 'next/image'
import Bg from '@/assets/bg.png'
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: `Year of the Dragon’s Li Xi`,
  description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
  metadataBase: new URL('https://lixi.aura.network'),
  openGraph: {
    title: `Year of the Dragon’s Li Xi`,
    description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
    images: [
      {
        url: 'https://campaign-fe.dev.aura.network/assets/thumb.png',
      },
    ],
    type: 'website',
    url: 'https://lixi.aura.network',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Year of the Dragon’s Li Xi`,
    description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
    images: ['https://campaign-fe.dev.aura.network/assets/thumb.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} bg-[#100302] overflow-x-hidden w-[100vw] min-h-[100dvh] min-w-[375px]`}>
        <ContextProvider>
          <Header />
          <main className='relative min-w-[100dvw] min-h-[100dvh]'>
            <Image src={Bg} alt='' className='absolute inset-0 w-full h-full object-cover' />
            <div className='relative'>{children}</div>
          </main>
        </ContextProvider>
      </body>
    </html>
  )
}
