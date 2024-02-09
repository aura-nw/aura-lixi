import { Bangkok } from '@/context'
import Medal1 from '@/assets/medal_1.svg'
import Medal2 from '@/assets/medal_2.svg'
import Medal3 from '@/assets/medal_3.svg'
import Image from 'next/image'
import Tooltip from '../tooltip'
import useSWR from 'swr'
import { fetchHistory, fetchLeaderboard } from '@/services'
export default function LeaderboardSection() {
  // const { data } = useSWR('fetchLeaderboard', fetchLeaderboard, {
  //   refreshInterval: 120000,
  // })
  const data: any = undefined
  const { data: history } = useSWR('fetchHistory', fetchHistory, {
    refreshInterval: 120000,
  })
  return (
    <section className='relative w-[343px] md:w-[317px] mt-4 mx-auto rounded-md border-[0.5px] border-[#FFD66B] bg-[linear-gradient(180deg,#FDF5CB_0%,#FDF5CB_0.01%,#FFF9DB_100%)] p-4 flex flex-col gap-4'>
      <div className='absolute inset-x-[15px] -top-[23px] flex justify-between'>
        <div className='rounded-[3px] bg-[linear-gradient(98deg,#FA7519_-2.01%,#FFCB7E_109.77%)] w-2 h-7'></div>
        <div className='rounded-[3px] bg-[linear-gradient(98deg,#FA7519_-2.01%,#FFCB7E_109.77%)] w-2 h-7'></div>
      </div>
      <div
        className={`text-2xl leading-[30px] tracking-[0.24px] text-[#8E0B09] w-full text-center ${Bangkok.className}`}>
        Leaderboard
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div
          className={`flex justify-between items-center text-[#000] text-sm leading-6 font-medium  ${
            data?.length > 6 ? 'pr-6' : ''
          }`}>
          <div className='flex items-center gap-6'>
            <div>Rank</div>
            <div>Participant</div>
          </div>
          <div className='flex items-center gap-[6px]'>
            <div>Point</div>
            <Tooltip content='1 point = 1 successful referral'>
              <div className='w-4 h-4 rounded-full bg-[linear-gradient(98deg,#EDB48D_-2.01%,#FFCB7E_109.77%)] grid place-items-center cursor-help'>
                <svg xmlns='http://www.w3.org/2000/svg' width='4' height='8' viewBox='0 0 4 8' fill='none'>
                  <path
                    d='M2.53401 1.67801H1.40601V0.562012H2.53401V1.67801ZM3.11001 7.43801H0.890015V6.16601H1.22601V3.46601H0.890015V2.19401H2.77401V6.16601H3.11001V7.43801Z'
                    fill='#732509'
                  />
                </svg>
              </div>
            </Tooltip>
          </div>
        </div>
        <div
          className={`w-full [&>div:nth-child(odd)]:bg-[#F5E3BC] [&>div:nth-child(even)]:bg-[transparent] h-[192px] overflow-auto custom-scrollbar ${
            data?.length > 6 ? 'pr-4' : ''
          }`}>
          {data
            ?.sort((a: any, b: any) => b.referrals_count - a.referrals_count)
            ?.map((row: any, index: number) => (
              <div
                key={index}
                className='w-full  flex items-center justify-between p-1 rounded-md text-sm leading-[18px]'>
                <div className='flex items-center gap-2'>
                  {index == 0 ? (
                    <Image src={Medal1} alt='' className='h-6' />
                  ) : index == 1 ? (
                    <Image src={Medal2} alt='' className='h-6' />
                  ) : index == 2 ? (
                    <Image src={Medal3} alt='' className='h-6' />
                  ) : (
                    <div className='text-[#292929] grid place-items-center font-semibold w-5 h-6'>{index + 1}</div>
                  )}
                  <div className='text-[#B93139]'>{row.username}</div>
                </div>
                <div className='text-[#292929]'>{row.referrals_count}</div>
              </div>
            ))}
        </div>
        <div className='border-t border-[#F5E3BC] pt-[6px] flex justify-end text-sm leading-6 text-[#6D3A0A] font-medium'>
          {`Your points: ${history?.length || 0}`}
        </div>
      </div>
    </section>
  )
}
