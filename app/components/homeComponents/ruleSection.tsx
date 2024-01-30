'use client'
import { Bangkok } from '@/app/layout'
import TopBar from '@/assets/bar.svg'
import TopBar2 from '@/assets/bar_2.svg'
import Image from 'next/image'
import { useState } from 'react'
import Modal from '../modal'
import { useDisclosure } from '@nextui-org/react'
import RedGem from '@/assets/red-gem.svg'
import GoldGem from '@/assets/gold-gem.svg'
import BlueGem from '@/assets/blue-gem.svg'
import WhiteGem from '@/assets/white-gem.svg'
import Aura from '@/assets/aura.svg'
export default function RuleSection() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <section className='w-full flex flex-col items-center relative'>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center gap-8'>
          <div className='flex flex-col items-center gap-2'>
            <div className={`${Bangkok.className} text-[#8E0B09] text-2xl leading-[30px] tracking-[0.24px] font-bold `}>
              The Year of Dragon’s Li Xi
            </div>
            <div className='font-bold text-[#292929]'>Prizes & Rules</div>
          </div>
          <div className='w-full'>
            <div className='font-bold text-[#292929] mb-4'>Prizes</div>
            <div className='flex gap-[22px] w-full'>
              <div className='flex flex-col items-center gap-2'>
                <Image src={RedGem} alt='' />
                <div className='text-sm'>Red gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={GoldGem} alt='' />
                <div className='text-sm'>Gold gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={BlueGem} alt='' />
                <div className='text-sm'>Blue gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={WhiteGem} alt='' />
                <div className='text-sm'>White gem</div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Image src={Aura} alt='' />
                <div className='text-sm'>AURA</div>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className='font-bold text-[#292929] mb-2'>Rules</div>
            <div className='text-sm leading-[18px]'>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
              ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
              fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
              justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
              ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
              metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
              sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
              pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae
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
        <div
          className='text-sm leading-6 font-medium text-[#FEF368] text-center w-full cursor-pointer'
          onClick={onOpen}>
          View Rule
        </div>
      </div>
    </section>
  )
}
