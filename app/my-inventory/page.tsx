'use client'

import InventorySection from './inventory'

import Background from '@/assets/home-background.png'
import MBackground from '@/assets/home-background_mobile.png'
import Image from 'next/image'
import Txs from './txs'
export default function Page() {
  return (
    <main className='relative min-h-screen'>
      {/* background  */}
      <div className='absolute inset-x-0 top-0 overflow-hidden flex flex-col items-center'>
        <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
        <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
      </div>
      {/* background  */}
      <div className='relative flex flex-col items-center xl:flex-row xl:items-start xl:justify-center xl:gap-4 pt-16 sm:pt-24 gap-8'>
        <InventorySection />
        <Txs/>
      </div>
    </main>
  )
}
