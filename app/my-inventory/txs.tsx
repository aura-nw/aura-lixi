import { Bangkok } from '@/context'
import { GET_TXS_HISTORY } from '@/services'
import { shortHash } from '@/utils'
import { useQuery, useSubscription } from '@apollo/client'
import moment from 'moment'
import getConfig from 'next/config'
import Link from 'next/link'

export default function Txs() {
  const { data } = useSubscription(GET_TXS_HISTORY)
  return (
    <div className='rounded-md border-[0.5px] border-[#FFD66B] w-[343px] md:w-[590px] md:ml-6 xl:ml-0 bg-[linear-gradient(180deg,#FDF5CB_0%,#FDF5CB_0.01%,#FFF9DB_100%)] p-4'>
      <div
        className={`text-2xl leading-[30px] tracking-[0.24px] text-[#8E0B09] w-full text-center ${Bangkok.className} mb-4`}>
        Claim transaction
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='grid grid-cols-2 text-[#000] text-sm leading-6 font-medium pr-6'>
          <div className=''>Transaction Hash</div>
          <div className='text-end'>Time</div>
        </div>
        <div
          className={`w-full [&>div:nth-child(odd)]:bg-[#F5E3BC] [&>div:nth-child(even)]:bg-[transparent] max-h-[222px] overflow-auto custom-scrollbar ${
            data?.tx_history?.length > 7 ? 'pr-4' : ''
          }`}>
          {data?.tx_history?.map((row: any, index: number) => (
            <div key={index} className=' p-1 rounded-md grid grid-cols-2 text-sm'>
              <Link
                target='_blank'
                href={`${getConfig().AURASCAN_ENDPOINT}/transaction/${row?.tx_info?.tx_hash}`}
                className='text-[#B93139] flex-1 pr-4'>
                {row?.tx_info?.tx_hash ? shortHash(row?.tx_info?.tx_hash) : 'Error Tx Hash'}
              </Link>
              <div className='text-[#292929] text-end'>{moment(row.updated_at).format('DD/MM/yyyy HH:mm')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
