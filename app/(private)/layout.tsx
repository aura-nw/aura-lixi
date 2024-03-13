'use client'

import ForceActive from '@/app/(private)/assets/force-active.svg'
import ForceInactive from '@/app/(private)/assets/force-inactive.svg'
import JackpotActive from '@/app/(private)/assets/jackpot-active.svg'
import JackpotInactive from '@/app/(private)/assets/jackpot-inactive.svg'
import QuestActive from '@/app/(private)/assets/quest-active.svg'
import QuestInactive from '@/app/(private)/assets/quest-inactive.svg'
import Active from '@/app/(private)/assets/active-tab.png'
import Inactive from '@/app/(private)/assets/inactive-tab.png'
import { Bangkok, Context } from '@/provider'
import { useChain, useWallet } from '@cosmos-kit/react'
import { WalletStatus } from 'cosmos-kit'
import getConfig from 'next/config'
import Image from 'next/image'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { ReactNode, useContext, useEffect } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { account } = useContext(Context)
  const { status } = useWallet()
  const { address } = useChain(getConfig().COSMOSKIT_CHAINKEY)
  useEffect(() => {
    if (
      !account?.wallet_address ||
      status == WalletStatus.Disconnected ||
      status == WalletStatus.Error ||
      (account.wallet_address && address && account.wallet_address != address)
    ) {
      redirect('/connect')
    }
  }, [account?.wallet_address, status, address])
  return (
    <div className='flex max-w-6xl mx-auto pt-20 md:pt-24 px-1 md:px-4 flex-col md:flex-row gap-4 md:gap-2'>
      <div className='flex md:flex-col gap-4 items-center justify-center md:justify-normal'>
        <div
          className='cursor-pointer'
          onClick={() => {
            router.push('/')
          }}>
          <div className='relative md:hidden cursor-pointer'>
            <Image src={pathname == '/' ? Active : Inactive} alt='' className={`w-[106px]`} />
            <div
              className={`${Bangkok.className} absolute inset-0 grid place-items-center ${
                pathname == '/' ? 'text-[#FFB438]' : 'text-[#828282]'
              }`}>
              <div className=''>Force</div>
            </div>
          </div>
          <Image src={ForceActive} alt='' className={`hidden w-[157px] ${pathname == '/' ? 'md:block' : ''}`} />
          <Image src={ForceInactive} alt='' className={` hidden w-[112px] ${pathname != '/' ? 'md:block' : ''}`} />
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            router.push('/jackpot')
          }}>
          <div className='relative md:hidden cursor-pointer'>
            <Image src={pathname == '/jackpot' ? Active : Inactive} alt='' className={`w-[106px]`} />
            <div
              className={`${Bangkok.className} absolute inset-0 grid place-items-center ${
                pathname == '/jackpot' ? 'text-[#FFB438]' : 'text-[#828282]'
              }`}>
              <div className=''>Jackpot</div>
            </div>
          </div>
          <Image
            src={JackpotActive}
            alt=''
            className={` hidden w-[157px] ${pathname == '/jackpot' ? 'md:block' : ''}`}
          />{' '}
          <Image
            src={JackpotInactive}
            alt=''
            className={` hidden w-[112px] ${pathname != '/jackpot' ? 'md:block' : ''}`}
          />
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            router.push('/quests')
          }}>
          <div className='relative md:hidden cursor-pointer'>
            <Image src={pathname == '/quests' ? Active : Inactive} alt='' className={`w-[106px]`} />
            <div
              className={`${Bangkok.className} absolute inset-0 grid place-items-center ${
                pathname == '/quests' ? 'text-[#FFB438]' : 'text-[#828282]'
              }`}>
              <div className=''>Quests</div>
            </div>
          </div>
          <Image src={QuestActive} alt='' className={` hidden w-[157px] ${pathname == '/quests' ? 'md:block' : ''}`} />{' '}
          <Image
            src={QuestInactive}
            alt=''
            className={` hidden w-[112px] ${pathname != '/quests' ? 'md:block' : ''}`}
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
