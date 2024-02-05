import { Bangkok } from '@/context'
import moment from 'moment'

export default function Txs() {
  const data: any = [
    {
      hash: 'BD201384...938AA6E9',
      time: '23/10/2023 9:00',
    },
  ]
  return (
    <div className='rounded-md border-[0.5px] border-[#FFD66B] bg-[linear-gradient(180deg,#FDF5CB_0%,#FDF5CB_0.01%,#FFF9DB_100%)] p-4'>
      <div
        className={`text-2xl leading-[30px] tracking-[0.24px] text-[#8E0B09] w-full text-center ${Bangkok.className} mb-4`}>
        Claim transaction
      </div>
      <div className='flex flex-col gap-2 sm:w-[482px]'>
        <div className='grid grid-cols-2 text-[#000] text-sm leading-6 font-medium pr-6'>
          <div className=''>Transaction Hash</div>
          <div className='text-end'>Time</div>
        </div>
        <div
          className={`w-full [&>div:nth-child(odd)]:bg-[#F5E3BC] [&>div:nth-child(even)]:bg-[transparent] max-h-[222px] overflow-auto custom-scrollbar ${
            data?.length > 7 ? 'pr-4' : ''
          }`}>
          {data?.map((row: any, index: number) => (
            <div key={index} className=' p-1 rounded-md grid grid-cols-2 text-sm'>
              <div className='text-[#B93139] flex-1 pr-4'>{row?.hash}</div>
              <div className='text-[#292929] text-end'>{row.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
