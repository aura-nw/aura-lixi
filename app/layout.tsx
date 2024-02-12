'use client'
import ContextProvider from '@/context'
import { useClient } from '@/hooks'
import { GoogleTagManager } from '@next/third-parties/google'
import { NextUIProvider } from '@nextui-org/react'
import { Roboto } from 'next/font/google'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './components/header'
import './globals.css'
import Image from 'next/image'
import NFImage from '@/assets/404.png'
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

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
      <body className='bg-[#000] '>
        <main className='relative min-h-screen grid place-items-center'>
          <Image src={NFImage} alt='' className='w-screen h-screen object-contain' />
        </main>
      </body>
    </html>
  )

  // return (
  //   <html lang='en'>
  //     <body className={`${roboto.variable} bg-[#860204] overflow-x-hidden w-[100vw] min-h-[100dvh] min-w-[375px]`}>
  //       <NextUIProvider>
  //         <ContextProvider>
  //           <Header />
  //           <main className='relative pb-20 md:pb-0'>{children}</main>
  //         </ContextProvider>
  //       </NextUIProvider>
  //       <ToastContainer
  //         position='top-center'
  //         autoClose={3000}
  //         hideProgressBar
  //         newestOnTop={false}
  //         closeOnClick={false}
  //         rtl={false}
  //         closeButton={() => <></>}
  //         pauseOnFocusLoss
  //         draggable={false}
  //         pauseOnHover={false}
  //         theme='dark'
  //         transition={Bounce}
  //         limit={3}
  //       />
  //     </body>
  //     <GoogleTagManager gtmId='GTM-K3NWXQS' />
  //   </html>
  // )
}
