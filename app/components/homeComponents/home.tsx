'use client'

import Background from '@/assets/home-background.png'
import MBackground from '@/assets/home-background_mobile.png'
import LixiStage from '@/assets/lixi-stage.svg'
import Image from 'next/image'
import BlueLixi from '@/assets/blue-lixi.svg'
import RedLixi from '@/assets/red-lixi.svg'
import GoldLixi from '@/assets/gold-lixi.svg'
import { Go3 } from '../../layout'
import RuleSection from './ruleSection'
import FortuneNumberSection from './fortuneNumberSection'
import LeaderboardSection from './leaderboardSection'
export default function HomePage() {
  return (
    <div className='relative min-h-screen'>
      {/* background  */}
      <div className='absolute inset-x-0 top-0 overflow-hidden flex flex-col items-center'>
        <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
        <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
      </div>
      {/* background  */}
      <div className='relative flex flex-col items-center w-full mx-auto mb-[9.2rem]'>
        <Image src={LixiStage} alt='' className='mt-20' />
        <div className='absolute top-[19.75rem] flex flex-col items-center'>
          <button className=' text-[#6D3A0A] font-semibold p-[10px] rounded-2xl bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-2 h-10 w-[149px] justify-center'>
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
      <RuleSection />
      <FortuneNumberSection />
      <LeaderboardSection/>
    </div>
  )
}
