'use client'
import TopBar from '@/assets/bar.svg'
import TopBar2 from '@/assets/bar_2.svg'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Modal from '../modal'
import { useDisclosure } from '@nextui-org/react'
import RedGem from '@/assets/red-gem.svg'
import GoldGem from '@/assets/gold-gem.svg'
import BlueGem from '@/assets/blue-gem.svg'
import WhiteGem from '@/assets/white-gem.svg'
import Aura from '@/assets/aura.svg'
import { Bangkok, Context } from '@/context'
import Link from 'next/link'
import getConfig from 'next/config'
import { gql, useQuery } from '@apollo/client'
import { checkRepost } from '@/services'
import useSWR from 'swr'
import Tooltip from '../tooltip'
export default function RuleSection() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { account } = useContext(Context)
  const [isReposted, setIsReposted] = useState(true)
  useSWR(
    { key: 'check_repost', isReposted },
    ({ isReposted }) => {
      if (!isReposted) {
        return check()
      } else {
        return null
      }
    },
    {
      refreshInterval: 180000,
    }
  )
  const { data } = useQuery(gql`
    query MyQuery {
      campaigns(where: { code: { _eq: "share-twitter" } }) {
        id
      }
    }
  `)
  const { data: tasks } = useQuery(gql`
    query MyQuery {
      tasks(where: { campaign_id: { _eq: ${data?.campaigns?.[0]?.id} }, user_id: { _eq: ${account?.id} } }) {
        id
      }
    }
  `)
  useEffect(() => {
    if (tasks) {
      setIsReposted(!!tasks?.tasks?.length)
    }
  }, [tasks?.tasks?.length])

  const check = async () => {
    try {
      const res = await checkRepost()
      setIsReposted(res?.data?.is_retweeted)
    } catch (error) {}
  }
  return (
    <section className='w-full flex flex-col items-center relative'>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center gap-8 max-w-[425px]'>
          <div className='flex flex-col items-center gap-2'>
            <div
              className={`${Bangkok.className} text-[#8E0B09] text-2xl leading-[30px] tracking-[0.24px] font-bold text-center `}>
              The Year of Dragon’s Li Xi
            </div>
            <div className='font-bold text-[#292929]'>Prizes & Rules</div>
          </div>
          <div className='w-full'>
            <div className='font-bold text-[#292929] mb-4'>Prizes</div>
            <div className='flex gap-[12px] sm:gap-[22px] w-full mx-auto justify-center'>
              <div className='flex flex-col items-center gap-2'>
                <Image src={RedGem} alt='' className='w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]' />
                <div className='text-sm text-center'>Red gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={GoldGem} alt='' className='w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]' />
                <div className='text-sm text-center'>Gold gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={BlueGem} alt='' className='w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]' />
                <div className='text-sm text-center'>Blue gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={WhiteGem} alt='' className='w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]' />
                <div className='text-sm text-center'>White gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={Aura} alt='' className='w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]' />
                <div className='text-sm text-center'>AURA</div>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className='font-bold text-[#292929] mb-2'>Rules</div>
            <div className='text-sm leading-[18px]'>
              Li Xi (red envelope/lucky money) is popular in the SEA/East Asia region as a way to send good wishes
              during Lunar New Year. For this occasion, we invite you to participate in our LNY campaign to send digital
              lucks to your friends, family and community through AURA tech, $AURA, and Dragon Gem.
              <br />
              <br /> Once logged in, a set of 5 Fortune Number will be generated. If all numbers are used up, a new set
              of numbers will be automatically issued. For every successfully referred account, you and your friend will
              receive 1 Blue Li Xi each.
            </div>
          </div>
        </div>
      </Modal>
      <Image src={TopBar} alt='' className='md:hidden' />
      <Image src={TopBar2} alt='' className='hidden md:block -mb-[5.1rem]' />
      <div className='flex -mt-1 flex-col gap-4 rounded-b-md border-x border-b border-[#D52121] p-4 w-[343px] md:w-[590px] md:ml-6 backdrop-blur-[6px] bg-[linear-gradient(180deg,rgba(117,20,20,0.50)_0%,rgba(133,7,7,0.50)_0.01%,rgba(244,63,63,0.50)_100%)]'>
        <div className='flex justify-between'>
          <div className={`text-[#FEF368] text-2xl leading-[30px] font-bold tracking-[0.24px] ${Bangkok.className}`}>
            The Year of Dragon’s Li Xi
          </div>
          {isReposted ? (
            <div className='p-[6px] rounded-[10px] bg-[linear-gradient(180deg,#EFEBE4_0%,#B3AAA0_100%)] flex items-center gap-[2px] h-6 text-[9px] justify-center'>
              <span className='font-medium text-[#6b6b6b] whitespace-nowrap'>Reposted to</span>
              <span className='p-[3px]'>
                <svg xmlns='http://www.w3.org/2000/svg' width='11' height='10' viewBox='0 0 11 10' fill='none'>
                  <path
                    d='M0.808026 0.100098L4.59169 5.50536L0.78418 9.9001H1.64117L4.97471 6.05235L7.66803 9.9001H10.5842L6.58754 4.19085L10.1316 0.100098H9.27461L6.20469 3.64369L3.72418 0.100098H0.808026ZM2.06826 0.774481H3.40793L9.32378 9.22571H7.98411L2.06826 0.774481Z'
                    fill='#6b6b6b'
                  />
                </svg>
              </span>
            </div>
          ) : (
            <Tooltip content='After reposting our post, a Gold Li Xi will be sent to your inventory in a few minutes.'>
              <Link
                target='_blank'
                href={`https://twitter.com/intent/retweet?tweet_id=${getConfig().TWITTER_POST_ID}`}
                className='p-[6px] rounded-[10px] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-[2px] h-6 text-[9px] justify-center'>
                <span className='font-medium text-[#6D3A0A] whitespace-nowrap'>Repost to</span>
                <span className='p-[3px]'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='11' height='10' viewBox='0 0 11 10' fill='none'>
                    <path
                      d='M0.808026 0.100098L4.59169 5.50536L0.78418 9.9001H1.64117L4.97471 6.05235L7.66803 9.9001H10.5842L6.58754 4.19085L10.1316 0.100098H9.27461L6.20469 3.64369L3.72418 0.100098H0.808026ZM2.06826 0.774481H3.40793L9.32378 9.22571H7.98411L2.06826 0.774481Z'
                      fill='#6D3A0A'
                    />
                  </svg>
                </span>
              </Link>
            </Tooltip>
          )}
        </div>
        <div className='flex flex-col gap-2 text-sm leading-[18px]'>
          <div className='flex gap-[11px]'>
            Complete missions to earn 3 types of Li Xi and receive precious Dragon Gems
          </div>
          <div className='flex gap-[11px]'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0 mt-1'></span>
            Red: Collect a fortune number & connect X account.
          </div>
          <div className='flex gap-[11px]'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0 mt-1'></span>
            Gold: Repost AURA’s post about this event on X.
          </div>
          <div className='flex gap-[11px]'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0 mt-1'></span>
            Blue: Share your fortune numbers to your friends. For every successfully registered account, you and your
            friend will receive 1 Blue Li Xi each.
          </div>
        </div>
        <div
          className='text-sm leading-6 font-medium text-[#FEF368] text-center w-full cursor-pointer'
          onClick={onOpen}>
          View Rule
        </div>
      </div>
    </section>
  )
}
