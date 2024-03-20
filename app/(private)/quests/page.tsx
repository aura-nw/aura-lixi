'use client'
import Image from 'next/image'
import TopBarCenter from './assets/top-bar-center.svg'
import TopBarSide from './assets/top-bar-side.svg'
import { Bangkok } from '@/provider'
import DragonSide from './assets/dragon-side.svg'
import { useQuery } from '@apollo/client'
import { GET_CAMPAIGN } from '@/services'
import QuestItem from './items'
import { Quest } from '@/model/quest'
export default function Page() {
  const { data } = useQuery(GET_CAMPAIGN)
  
  return (
    <div className='relative w-full'>
      <div className='w-full relative h-3 bg-[conic-gradient(from_180deg_at_50%_50%,#EF6608_60.48818528652191deg,#F8BD25_183.23987245559692deg,#AF3006_338.95015239715576deg)] rounded-[3px]'>
        <Image src={TopBarSide} alt='' className='absolute top-1/2 -translate-y-1/2 left-0 -translate-x-2/3' />
        <Image src={TopBarCenter} alt='' className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
        <Image
          src={TopBarSide}
          alt=''
          className='absolute top-1/2 scale-x-[-1] -translate-y-1/2 right-0 translate-x-2/3'
        />
      </div>
      <div className='mx-auto py-4 px-40 bg-[#ECE1C8] rounded-b-md w-[calc(100%-24px)] flex flex-col items-center gap-4 relative min-h-[586px]'>
        <Image src={DragonSide} alt='' className='absolute left-0 top-20' />
        <Image src={DragonSide} alt='' className='absolute right-0 top-20 scale-x-[-1]' />
        <div className={`text-[#6D3A0A] ${Bangkok.className} font-bold text-2xl`}>Quest</div>
        {data?.items?.map((d:Quest) => <QuestItem data={d} key={d.id} />)}
      </div>
    </div>
  )
}
