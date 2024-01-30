'use client'

import BlueLixi from '@/assets/blue-lixi.svg'
import GoldLixi from '@/assets/gold-lixi.svg'
import Background from '@/assets/home-background.png'
import MBackground from '@/assets/home-background_mobile.png'
import LixiStage from '@/assets/lixi-stage.svg'
import Lixi from '@/assets/lixi.svg'
import RedLixi from '@/assets/red-lixi.svg'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { Bangkok, Go3 } from '../../layout'
import GiftModal from '../modal/giftModal'
import FortuneNumberSection from './fortuneNumberSection'
import LeaderboardSection from './leaderboardSection'
import RuleSection from './ruleSection'
import RedGem from '@/assets/red-gem.svg'
export default function HomePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className='relative min-h-screen'>
      <GiftModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center'>
          <div className={`${Bangkok.className} text-[#8E0B09] text-sm`}>Congratulations!</div>
          <div className='mt-[6px] text-sm leading-5 text-center'>You have received a prize.<br /> Don’t forget to claim it in inventory</div>
          <Image src={RedGem} alt='' className='mt-4 w-[72px]' />
          <div className='text-[#000] font-bold text-sm mt-[8px]'>Red Gem</div>
        </div>
      </GiftModal>
      {/* background  */}
      <div className='absolute inset-x-0 top-0 overflow-hidden flex flex-col items-center'>
        <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
        <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
      </div>
      {/* background  */}
      <div className='flex flex-col items-center xl:flex-row xl:items-start xl:justify-center xl:gap-12 xl:pt-7'>
        <div className='relative flex flex-col items-center w-full xl:w-fit xl:mx-0 mx-auto mb-[9.2rem]'>
          <Image src={Lixi} alt='' className='mt-20 relative z-[2] -mb-3' />
          <Image src={LixiStage} alt='' className='relative z-[1]' />
          <div className='absolute z-[3] top-[19.75rem] flex flex-col items-center'>
            <button
              onClick={onOpen}
              className=' text-[#6D3A0A] font-semibold p-[10px] rounded-2xl bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-2 h-10 w-[149px] justify-center'>
              OPEN
            </button>
            <div className='mt-10 text-[#F9E2A4] text-sm leading-[18px] '>
              You don’t have any Li Xi, refer your friends to earn more.
            </div>
            <div className='flex mt-4 relative z-[2] gap-1'>
              <Image src={BlueLixi} alt='' className='w-[105px] h-[108px]' />
              <Image src={RedLixi} alt='' className='w-[105px] h-[108px]' />
              <Image src={GoldLixi} alt='' className='w-[105px] h-[108px]' />
            </div>
            <div className='relative grid place-items-center w-[347px] h-[83px] -mt-8 z-[1] rounded-md border-[5px] border-[#EDB48D] bg-[#B43325] shadow-[0px_4px_9.9px_0px_rgba(0,0,0,0.10),0px_4px_4px_0px_rgba(0,0,0,0.25)] '>
              <div className='flex w-[286px] justify-between absolute bottom-[11px]'>
                <div
                  className={`${Go3.className} h-[22px] rounded-2xl px-[10px] text-center min-w-[54px] bg-[#860204] shadow-[0px_2px_3.5px_0px_rgba(0,0,0,0.10)_inset] `}>
                  0
                </div>
                <div
                  className={`${Go3.className} h-[22px] rounded-2xl px-[10px] text-center min-w-[54px] bg-[#860204] shadow-[0px_2px_3.5px_0px_rgba(0,0,0,0.10)_inset] `}>
                  1888
                </div>
                <div
                  className={`${Go3.className} h-[22px] rounded-2xl px-[10px] text-center min-w-[54px] bg-[#860204] shadow-[0px_2px_3.5px_0px_rgba(0,0,0,0.10)_inset] `}>
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center xl:mt-20'>
          <RuleSection />
          <div className='flex flex-col items-center md:flex-row md:items-start md:gap-[14px] md:ml-6'>
            <FortuneNumberSection />
            <LeaderboardSection />
          </div>
        </div>
      </div>
    </div>
  )
}
