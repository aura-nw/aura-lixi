'use client'

import NoBackgroundModal from '@/components/modal/giftModal'
import Image from 'next/image'
import BackdropMobile from '../assets/prizeBackdropMobile.svg'
import Backdrop from '../assets/prizeBackdrop.svg'
import { Bangkok, Context } from '@/provider'
import { useContext } from 'react'
import { formatNumber } from '@/utils'
export default function ResultModal({ prize, isOpen, onOpenChange, onClose }: any) {
  const { account } = useContext(Context)
  return (
    <NoBackgroundModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <div>
        <Image src={BackdropMobile} alt='' className='md:hidden' />
        <Image src={Backdrop} alt='' className='hidden md:block' />
        {prize ? (
          <div className={`absolute left-1/2 -translate-x-1/2 top-[121px] text-xl`}>
            <div className={`${Bangkok.className} flex flex-col items-center md:flex-row`}>
              <span>Congratulations!</span>
              <span className='text-[#FFE346] ml-[1ch]'>{account?.username}</span>
            </div>
            <div className='text-sm leading-6 font-bold text-center mt-8 flex items-center justify-center'>
              <span className='text-5xl leading-6 -translate-y-1 mr-[.5ch]'>{formatNumber(prize)}</span>
              <span>AURA</span>
            </div>
          </div>
        ) : (
          <div className={`absolute left-1/2 -translate-x-1/2 top-[145px] text-xl text-[#FB5050] ${Bangkok.className}`}>
            Good luck next time!
          </div>
        )}
      </div>
    </NoBackgroundModal>
  )
}
