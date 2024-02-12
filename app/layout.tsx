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
import NFImageBG from '@/assets/404_bg.png'
import NFImageGem from '@/assets/404_gem.png'
import NFImageCt from '@/assets/404_content.svg'
import NFImageCt1 from '@/assets/404_content_1.svg'
import NFImageCt2 from '@/assets/404_content_2.svg'
import NFImageCt3 from '@/assets/404_content_3.svg'

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
        <main className='relative min-h-[100dvh] grid place-items-center'>
          <Image src={NFImageBG} alt='' className='w-screen h-[100dvh] object-cover' />
          <div className='absolute inset-0 grid place-items-center'>
            <Image src={NFImageGem} alt='' className='w-screen h-[100dvh] object-contain max-w-[1200px]' />
          </div>
          <div className='absolute inset-10'>
            <div className='w-full h-full flex flex-col justify-between items-center'>
              <Image src={NFImageCt1} alt='' className='w-[200px]' />
              <Image src={NFImageCt2} alt='' className='w-full max-w-[550px]' />
              <Image src={NFImageCt3} alt='' className='w-[140px]' />
            </div>
          </div>
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
