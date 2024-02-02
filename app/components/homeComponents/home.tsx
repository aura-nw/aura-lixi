'use client'

import Background from '@/assets/home-background.png'
import MBackground from '@/assets/home-background_mobile.png'
import Stage from '@/assets/home-stage.svg'
import { Context } from '@/context'
import getConfig from 'next/config'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'
import FortuneNumberSection from './fortuneNumberSection'
import LeaderboardSection from './leaderboardSection'
import LixiStage from './lixiStage'
import RuleSection from './ruleSection'

export default function HomePage() {
  const { account, submitCode } = useContext(Context)
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const config = getConfig()
  const params = useParams()

  const connectXHandler = () => {
    window.location.href = `${config.REST_API_ENDPOINT}/auth/twitter`
  }

  const submitCodeHandler = async () => {
    try {
      await submitCode(value)
    } catch (error) {}
  }

  if (account && account.code) {
    return (
      <div className='relative min-h-screen'>
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
      </div>
    )
  }

  return (
    <div className='relative min-h-screen'>
      {/* background  */}
      <div className='absolute inset-0 overflow-hidden flex flex-col items-center'>
        <Image src={Background} alt='' className='w-full min-w-[1008px] hidden sm:block' />
        <Image src={MBackground} alt='' className='w-full min-w-[375px] mt-[50px] sm:hidden' />
      </div>
      {/* background  */}
      <div className='relative overflow-hidden flex flex-col items-center w-full mx-auto'>
        <Image src={Stage} alt='' className='mt-16 max-w-[390px] w-[110%] mr-[2.3rem]' />
        <div className='absolute top-[69%] inset-x-0 flex flex-col items-center'>
          {account && !account?.code ? (
            <>
              <div className='text-[#F7C983] text-sm leading-4 font-semibold'>Fortune Number</div>
              <div className='mt-4 w-[311px] flex gap-4'>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  title='Fortune Number'
                  className={`text-sm leading-[18px] p-[10px] bg-[#fff] rounded-lg shadow-[0px_4px_8.8px_0px_rgba(0,0,0,0.25)_inset] w-[251px] ${
                    errorMsg ? 'text-[#F23A3A]' : 'text-[#292929]'
                  } focus:outline-none`}
                />
                <button
                  onClick={submitCodeHandler}
                  disabled={!value || !!errorMsg}
                  className='cursor-pointer p-[10px] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] rounded-2xl disabled:bg-[linear-gradient(180deg,#EFEBE4_0%,#B3AAA0_100%)] [&_path]:disabled:stroke-[#9D9D9D]'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path d='M5 12H19' stroke='#6D3A0A' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    <path
                      d='M12 5L19 12L12 19'
                      stroke='#6D3A0A'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
              {errorMsg && <div className='text-sm leading-[18px] text-[#F23A3A] mt-[6px] w-[311px]'>{errorMsg}</div>}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
