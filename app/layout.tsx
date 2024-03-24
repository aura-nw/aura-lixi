import ContextProvider from '@/provider'
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '@/components/header'
import './globals.css'
import Image from 'next/image'
import Bg from '@/assets/bg.png'
import { Suspense } from 'react'
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: `Aura Network Gem Forge: Quest for the Dragon's Wish`,
  description:
    "Join the legendary Gem Forge challenge by Aura Network. Embark on the quest to fulfill the Dragon's Wish, forge gems, and vie for the ultimate prize",
  metadataBase: new URL('https://gem.aura.network'),
  openGraph: {
    title: `Aura Network Gem Forge: Quest for the Dragon's Wish`,
    description:
      "Join the legendary Gem Forge challenge by Aura Network. Embark on the quest to fulfill the Dragon's Wish, forge gems, and vie for the ultimate prize",
    images: [
      {
        url: 'https://gem.aura.network/assets/thumb.png',
      },
    ],
    type: 'website',
    url: 'https://gem.aura.network',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Aura Network Gem Forge: Quest for the Dragon's Wish`,
    description:
      "Join the legendary Gem Forge challenge by Aura Network. Embark on the quest to fulfill the Dragon's Wish, forge gems, and vie for the ultimate prize",
    images: ['https://gem.aura.network/assets/thumb.png'],
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
        <Suspense>
          <ContextProvider>
            <Header />
            <main className='relative min-w-[100dvw] min-h-[100dvh]'>
              <Image src={Bg} alt='' className='absolute inset-0 w-full h-full object-cover' />
              <div className='relative'>{children}</div>
            </main>
          </ContextProvider>
        </Suspense>
      </body>
    </html>
  )
}
