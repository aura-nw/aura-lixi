'use client'
import { Bangkok } from '@/app/layout'
import TopBar from '@/assets/bar.svg'
import Image from 'next/image'
export default function RuleSection() {
  return (
    <section className='w-full flex flex-col items-center'>
      <Image src={TopBar} alt='' />
      <div className='flex -mt-1 flex-col gap-4 rounded-b-md border-x border-b border-[#D52121] p-4 w-[343px] bg-[linear-gradient(180deg,rgba(117,20,20,0.50)_0%,rgba(133,7,7,0.50)_0.01%,rgba(244,63,63,0.50)_100%)]'>
        <div className='flex'>
          <div className={`text-[#FEF368] text-2xl leading-[30px] font-bold tracking-[0.24px] ${Bangkok.className}`}>
            The Year of Dragon’s Li Xi
          </div>
          <button className='p-[6px] rounded-[10px] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-[2px] h-6 text-[9px] justify-center'>
            <span className='font-medium text-[#6D3A0A] whitespace-nowrap'>Repost to</span>
            <span className='p-[3px]'>
              <svg xmlns='http://www.w3.org/2000/svg' width='11' height='10' viewBox='0 0 11 10' fill='none'>
                <path
                  d='M0.808026 0.100098L4.59169 5.50536L0.78418 9.9001H1.64117L4.97471 6.05235L7.66803 9.9001H10.5842L6.58754 4.19085L10.1316 0.100098H9.27461L6.20469 3.64369L3.72418 0.100098H0.808026ZM2.06826 0.774481H3.40793L9.32378 9.22571H7.98411L2.06826 0.774481Z'
                  fill='#6D3A0A'
                />
              </svg>
            </span>
          </button>
        </div>
        <div className='flex flex-col gap-2 text-sm leading-[18px]'>
          <div className='flex gap-[11px]'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0 mt-1'></span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros nibh. Sed sollicitudin semper ornare.
            Proin a eros quis
          </div>
          <div className='flex gap-[11px]'>
            <span className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#F0C865] shrink-0 mt-1'></span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros nibh. Sed sollicitudin semper ornare.
            Proin a eros quis
          </div>
        </div>
        <div className='text-sm leading-6 font-medium text-[#FEF368] text-center w-full cursor-pointer'>View Rule</div>
      </div>
    </section>
  )
}