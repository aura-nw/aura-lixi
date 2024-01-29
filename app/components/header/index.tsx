'use client'

import Image from 'next/image'
import Logo from 'assets/logo.svg'
import UserIcon from '@/assets/user-icon.svg'
import { useRef, useState } from 'react'
import { useClickOutside } from '@/hooks'
import Link from 'next/link'
export function Header() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))
  return (
    <header ref={ref} className='fixed top-0 w-full z-10 '>
      <div className=' bg-[linear-gradient(180deg,rgba(85,5,5,0.30)_26%,rgba(40,3,3,0.00)_100%)] border-b backdrop-blur-[20px] border-[#550E0E] shadow-[0px_4px_20px_1px_rgba(0,0,0,0.20)] '>
        <div className='flex justify-between items-center w-full max-w-[1117px] mx-auto  h-[50px] sm:h-[60px] px-4 pt-3 pb-[11px]'>
          <Image src={Logo} alt='' className='w-[77px] sm:w-[108px]' />
          <div onClick={() => setOpen(!open)} className='relative'>
            <Image src={UserIcon} alt='' className='w-[30px] h-[30px] sm:w-[38px] sm:h-[38px]' />
          </div>
        </div>
      </div>
      {open && (
        <div className='absolute top-full right-[max(16px,calc(50%-545px))] p-4 rounded-b-md flex flex-col gap-4 border-x border-b border-[#D52121] bg-[linear-gradient(180deg,rgba(117,20,20,0.50)_0%,rgba(133,7,7,0.50)_0.01%,rgba(244,63,63,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
          <Link
            href='/my-inventory'
            className='text-sm leading-6 font-medium flex items-center gap-2 whitespace-nowrap'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0'></span>
            My Inventory
          </Link>
          <div className='text-sm leading-6 font-medium flex items-center gap-2 whitespace-nowrap'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0'></span>
            Disconnect
          </div>
        </div>
      )}
    </header>
  )
}
