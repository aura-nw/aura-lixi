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
import { Snippet } from '@nextui-org/react'
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
