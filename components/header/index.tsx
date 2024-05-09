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
import { formatNumber, shorten } from '@/utils'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Snippet } from '@nextui-org/react'
import useSWR from 'swr'
export function Header() {
  const [open, setOpen] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const { disconnect, account, balance } = useContext(Context)
  const config = getConfig()
  const { disconnect: disconnectWallet, address } = useChain(config.COSMOSKIT_CHAINKEY)
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
                  <Snippet
                    disableTooltip
                    classNames={{
                      base: 'bg-[transparent] text-[#fff] p-0',
                      pre: 'hidden',
                      copyButton: 'h-5',
                    }}>
                    {address}
                  </Snippet>
                </div>
                <div className='font-semibold'>Balance</div>
                <div className='flex justify-between items-center'>
                  <div>{showBalance ? `${formatNumber(balance)} AURA` : '*******'}</div>
                  <div
                    className='w-8 grid place-items-center cursor-pointer'
                    onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? (
                      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                        <path
                          d='M0.666504 8.00008C0.666504 8.00008 3.33317 2.66675 7.99984 2.66675C12.6665 2.66675 15.3332 8.00008 15.3332 8.00008C15.3332 8.00008 12.6665 13.3334 7.99984 13.3334C3.33317 13.3334 0.666504 8.00008 0.666504 8.00008Z'
                          stroke='#fff'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z'
                          stroke='#fff'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    ) : (
                      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                        <g clip-path='url(#clip0_2816_798)'>
                          <path
                            d='M11.96 11.96C10.8204 12.8286 9.4327 13.3099 7.99996 13.3333C3.33329 13.3333 0.666626 7.99998 0.666626 7.99998C1.49589 6.45457 2.64605 5.10438 4.03996 4.03998M6.59996 2.82664C7.05885 2.71923 7.52867 2.66554 7.99996 2.66664C12.6666 2.66664 15.3333 7.99998 15.3333 7.99998C14.9286 8.75705 14.446 9.4698 13.8933 10.1266M9.41329 9.41331C9.23019 9.60981 9.00939 9.76741 8.76406 9.87673C8.51873 9.98604 8.25389 10.0448 7.98535 10.0496C7.71681 10.0543 7.45007 10.0049 7.20103 9.9043C6.952 9.80371 6.72577 9.654 6.53586 9.46408C6.34594 9.27416 6.19622 9.04794 6.09563 8.7989C5.99504 8.54987 5.94564 8.28312 5.95038 8.01458C5.95512 7.74604 6.0139 7.48121 6.12321 7.23587C6.23252 6.99054 6.39013 6.76974 6.58663 6.58664'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M0.666626 0.666626L15.3333 15.3333'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_2816_798'>
                            <rect width='16' height='16' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            )}
            <FilledButton
              className='max-w-[156px] !py-1'
              id='action_logout'
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
