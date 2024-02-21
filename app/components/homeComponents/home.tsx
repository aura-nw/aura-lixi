'use client'

import BlueLixi from '@/assets/blue-lixi.svg'
import Background from '@/assets/home-background.png'
import MBackground from '@/assets/home-background_mobile.png'
import Stage from '@/assets/home-stage.svg'
import { Context, DN } from '@/context'
import moment from 'moment'
import getConfig from 'next/config'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import useSWR from 'swr'
import FortuneNumberSection from './fortuneNumberSection'
import LeaderboardSection from './leaderboardSection'
import LixiStage from './lixiStage'
import RuleSection from './ruleSection'
import { getItem } from '@/utils/localStorage'
import BGFl from '@/assets/bg-follow.svg'
import BGFldt from '@/assets/bg-follow-dt.svg'
import Link from 'next/link'
import { SpecialResult } from './specialResult'
export default function HomePage() {
  const { account, submitCode } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const config = getConfig()

  const connectXHandler = () => {
    window.location.href = `${config.REST_API_ENDPOINT}/auth/twitter`
  }
  useEffect(() => {
    setErrorMsg('')
  }, [value])

  const submitCodeHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      await submitCode(value)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      if (error?.message || typeof error == 'string') {
        setErrorMsg(error?.message || error)
      } else {
        setErrorMsg('Something went wrong. Please try again.')
      }
    }
  }
  if (!account?.refferal_code) {
    return (
      <main className='relative min-h-screen'>
        {/* background  */}
        <div className='absolute inset-0 overflow-hidden flex flex-col items-center'>
          <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
          <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
        </div>
      </main>
    )
  }

  if (account && !account.code && account.refferal_code?.length > 1) {
    return (
      <main className='relative min-h-screen'>
        {/* background  */}
        <div className='absolute inset-x-0 top-0 overflow-hidden flex flex-col items-center'>
          <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
          <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
        </div>
        {/* background  */}
        <div className='flex flex-col items-center relative pt-20'>
          <Image src={BGFl} alt='' className='md:hidden' />
          <Image src={BGFldt} alt='' className='hidden md:block' />
          <div className='bottom-[20%] w-[317px] md:w-[417px] absolute'>
            <div className='text-base text-center'>
              You're not able to access this time because you missed the Dragon's last visit. But stay tuned, more
              exciting opportunities are on the horizon!
            </div>
          </div>
        </div>
      </main>
    )
  }
  if (account && !account.isFollowed) {
    return (
      <main className='relative min-h-screen'>
        {/* background  */}
        <div className='absolute inset-x-0 top-0 overflow-hidden flex flex-col items-center'>
          <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
          <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
        </div>
        {/* background  */}
        <div className='flex flex-col items-center relative pt-20'>
          <Image src={BGFl} alt='' className='md:hidden' />
          <Image src={BGFldt} alt='' className='hidden md:block' />
          <div className='bottom-5 w-[317px] md:w-[417px] absolute'>
            <div className='text-sm'>
              Follow Aura Network's Twitter and turn on your notifications to unveil the secrets of Dragon Power and
              acquire Dragon Gems.
              <br />
              <br />
              Note: The portal is available for those who have yet to claim their treasures; no further Li Xi will be
              distributed upon entry.
            </div>
            <Link
              href='https://twitter.com/intent/follow?screen_name=AuraNetworkHQ'
              target='_blank'
              className='p-[10px] rounded-2xl bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-2 h-10 w-[149px] justify-center mx-auto mt-3'>
              <span className='font-medium text-[#6D3A0A]'>Follow</span>
            </Link>
            <div className='text-[#FEA768] text-sm mt-3 text-center'>
              Refresh if the page isn't automatically redirected
            </div>
          </div>
        </div>
      </main>
    )
  }
  if (account) {
    return (
      <>
        {account.specialRequestId && !getItem('request_id') && <SpecialResult requestId={account.specialRequestId} />}
        <main className='relative min-h-screen'>
          {/* background  */}
          <div className='absolute inset-x-0 top-0 overflow-hidden flex flex-col items-center'>
            <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
            <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
          </div>
          {/* background  */}
          <div className='flex flex-col items-center xl:flex-row xl:items-start xl:justify-center xl:gap-12 xl:pt-7'>
            <LixiStage />
            <div className='flex flex-col items-center xl:mt-20'>
              <RuleSection />
              <div className='flex flex-col items-center md:flex-row md:items-start md:gap-[14px] md:ml-6'>
                <FortuneNumberSection />
                <LeaderboardSection />
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <main className='relative min-h-screen'>
      {/* background  */}
      <div className='absolute inset-0 overflow-hidden flex flex-col items-center'>
        <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
        <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
      </div>
      {/* background  */}
      <div className='relative overflow-hidden flex flex-col items-center w-full mx-auto'>
        <Image src={Stage} alt='' className='mt-16 max-w-[390px] w-[110%] mr-[2.3rem]' />
        <div className='absolute top-[69%] inset-x-0 flex flex-col items-center'>
          <button
            onClick={connectXHandler}
            className='p-[10px] rounded-2xl bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-2 h-10 w-[149px] justify-center'>
            <span className='font-medium text-[#6D3A0A]'>Connect</span>
            <span className='p-[3px]'>
              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path
                  d='M0.0340664 0L5.4393 7.7218L0 14H1.22427L5.98647 8.50322L9.83407 14H14L8.29052 5.84394L13.3534 0H12.1292L7.74358 5.06227L4.2 0H0.0340664ZM1.8344 0.963405H3.74821L12.1994 13.0366H10.2856L1.8344 0.963405Z'
                  fill='#6D3A0A'
                />
              </svg>
            </span>
          </button>
          <div className='text-[#FEA768] italic text-sm leading-4 mt-11'>
            *Please connect your X account to continue
          </div>
        </div>
      </div>
    </main>
  )
}
