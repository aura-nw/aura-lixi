'use client'

import Image from 'next/image'
import Logo from 'assets/logo.svg'
import UserIcon from '@/assets/user-icon.svg'
import { useContext, useRef, useState } from 'react'
import { useClickOutside } from '@/hooks'
import Link from 'next/link'
import { Context } from '@/provider'
import { useRouter } from 'next/navigation'
import { useChain } from '@cosmos-kit/react'
import getConfig from 'next/config'
export function Header() {
  const [open, setOpen] = useState(false)
  const { disconnect, account } = useContext(Context)
  const config = getConfig()
  const { disconnect: disconnectWallet } = useChain(config.COSMOSKIT_CHAINKEY)
  const router = useRouter()
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))
  return (
    <header ref={ref} className='fixed top-0 w-full z-50 '>
      <div className='border-b border-[#550E0E] bg-[linear-gradient(126deg,rgba(85,5,5,0.30)_13.84%,rgba(40,3,3,0.00)_74.14%)] shadow-[0px_4px_20px_1px_rgba(0,0,0,0.20)] backdrop-blur-[20px]'>
        <div className='flex justify-between items-center w-full max-w-7xl mx-auto px-4 py-3'>
          <Link href='/'>
            <Image src={Logo} alt='' className='w-[77px] sm:w-[108px]' />
          </Link>
          {account && (
            <div onClick={() => setOpen(!open)} className='relative flex items-center gap-2 cursor-pointer'>
              <Image src={UserIcon} alt='' className='w-[30px] h-[30px] sm:w-[38px] sm:h-[38px]' />
              <span className='text-[#F7C983] text-sm'>{account.username}</span>
            </div>
          )}
        </div>
      </div>
      {open && account && (
        <div className='absolute top-full right-[max(16px,calc(50%-545px))] p-4 rounded-b-md flex flex-col gap-4 border-x border-b border-[#D52121] bg-[linear-gradient(180deg,rgba(117,20,20,0.50)_0%,rgba(133,7,7,0.50)_0.01%,rgba(244,63,63,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
          <div
            className='text-sm leading-6 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer'
            onClick={() => {
              disconnect()
              disconnectWallet?.()
            }}>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0'></span>
            Disconnect
          </div>
        </div>
      )}
    </header>
  )
}
