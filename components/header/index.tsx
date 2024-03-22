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
import FilledButton from '../button/filled'
import { shorten } from '@/utils'
import CopyToClipboard from 'react-copy-to-clipboard'
export function Header() {
  const [open, setOpen] = useState(false)
  const { disconnect, account } = useContext(Context)
  const config = getConfig()
  const { disconnect: disconnectWallet, address } = useChain(config.COSMOSKIT_CHAINKEY)
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
        <div className='absolute top-full right-[max(16px,calc(50%-745px))] p-4 rounded-b-md flex flex-col gap-4 min-w-[288px] border-[#ECCB83] bg-[linear-gradient(180deg,rgba(76,50,36,0.50)_0%,rgba(80,49,38,0.50)_0.01%,rgba(166,123,81,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
          <div className='flex flex-col items-center gap-4'>
            {address && (
              <div className='grid grid-cols-[55px_1fr] gap-4 text-sm w-full'>
                <div className='font-semibold'>Address</div>
                <div className='flex justify-between items-center'>
                  <div>{shorten(address, 8, 8)}</div>
                  <CopyToClipboard text={address}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <g clip-path='url(#clip0_2132_5264)'>
                        <path
                          d='M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z'
                          stroke='white'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M3.33337 10H2.66671C2.31309 10 1.97395 9.85956 1.7239 9.60952C1.47385 9.35947 1.33337 9.02033 1.33337 8.66671V2.66671C1.33337 2.31309 1.47385 1.97395 1.7239 1.7239C1.97395 1.47385 2.31309 1.33337 2.66671 1.33337H8.66671C9.02033 1.33337 9.35947 1.47385 9.60952 1.7239C9.85956 1.97395 10 2.31309 10 2.66671V3.33337'
                          stroke='white'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_2132_5264'>
                          <rect width='16' height='16' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </CopyToClipboard>
                </div>
              </div>
            )}
            <FilledButton
              className='max-w-[156px] !py-1'
              onClick={() => {
                disconnect()
                disconnectWallet?.()
              }}>
              Log out
            </FilledButton>
          </div>
        </div>
      )}
    </header>
  )
}
