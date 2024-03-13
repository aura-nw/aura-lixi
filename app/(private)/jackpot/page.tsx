'use client'
import GemSlot from '@/app/(private)/assets/gem-slot.svg'
import JackpotBg from '@/app/(private)/assets/jackpot-bg.svg'
import Machine from '@/app/(private)/assets/machine.png'
import TopBar2 from '@/app/(private)/assets/top-bar-2.svg'
import TopBar from '@/app/(private)/assets/top-bar.svg'
import IconClose from '@/assets/ic_close.svg'
import FilledButton from '@/components/button/filled'
import Gem from '@/components/gem'
import GemWithFrame from '@/components/gem/gemWithFrame'
import { Bangkok, Context } from '@/provider'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Map } from 'immutable'
import Image from 'next/image'
import { useContext, useEffect, useMemo, useState } from 'react'
const initList = {
  w1: 0,
  w2: 0,
  w3: 0,
  w4: 0,
  w5: 0,
  w6: 0,
  w7: 0,
  b1: 0,
  b2: 0,
  b3: 0,
  b4: 0,
  b5: 0,
  b6: 0,
  b7: 0,
  g1: 0,
  g2: 0,
  g3: 0,
  g4: 0,
  g5: 0,
  g6: 0,
  g7: 0,
  r1: 0,
  r2: 0,
  r3: 0,
  r4: 0,
  r5: 0,
  r6: 0,
  r7: 0,
}
export default function Page() {
  const { inventory } = useContext(Context)
  const [selectedColorKey, setSelectedColorKey] = useState(new Set(['all_colors']))
  const selectedColorValue = useMemo(
    () => Array.from(selectedColorKey).join(', ').replaceAll('_', ' '),
    [selectedColorKey]
  )
  const [selectedRankKey, setSelectedRankKey] = useState(new Set(['all_rank']))
  const selectedRankValue = useMemo(
    () => Array.from(selectedRankKey).join(', ').replaceAll('_', ' '),
    [selectedRankKey]
  )
  const [selectedGems, setSelectedGems] = useState<(string | undefined)[]>([undefined, undefined, undefined])
  const [gems, setGems] = useState<any>(Map(initList))

  useEffect(() => {
    const gemList = inventory.reduce((total, current) => {
      const color = current.media_info.onchain.metadata.attributes.find((attr) => attr.trait_type == 'Color')?.value
      if (color == 'WHITE') {
        total['w1']++
      }
      if (color == 'BLUE') {
        total['b1']++
      }
      if (color == 'GOLD') {
        total['g1']++
      }
      if (color == 'RED') {
        total['r1']++
      }
      return total
    }, initList)
    setGems(Map(gemList))
  }, [inventory?.length])

  const addGemHandler = (type: string) => {
    for (let i = 0; i < 3; i++) {
      if (selectedGems[i] == undefined) {
        selectedGems[i] = type
        break
      }
    }
    setSelectedGems([...selectedGems])
  }

  return (
    <div className='ml-2 flex flex-wrap gap-5 justify-center'>
      <div className='relative'>
        <Image src={TopBar} alt='' className='w-[595px] relative z-10' />
        <div className='relative w-[544px] mx-auto -mt-2 rounded-b-[4px] border border-[#ECCB83] p-8 bg-[linear-gradient(180deg,rgba(76,50,36,0.50)_0%,rgba(80,49,38,0.50)_0.01%,rgba(166,123,81,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
          <div className='absolute inset-x-0 top-28 grid place-items-center'>
            <Image src={JackpotBg} alt='' className='w-[314px] h-[297px]' />
          </div>
          <div className='relative mt-5 flex flex-col items-center'>
            <div>
              <Image src={Machine} alt='' className='w-[236px] h-[252px]' />
            </div>
            <div className='text-sm text-[#FFFFFF] mt-8'>Jackpot will be revealed at 2 pm, 24th Mar 2024 (UTC +7) </div>
            <div className='mt-4 flex gap-4'>
              <div className='relative'>
                <Image src={GemSlot} alt='' className='w-[87px] h-[93px]' />
                {selectedGems[0] && (
                  <div
                    className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                    onClick={() => setSelectedGems([undefined, selectedGems[1], selectedGems[2]])}>
                    <div className='absolute inset-0 grid place-items-center invisible'>
                      <div className='bg-[#000]/50 h-10 w-10 rounded-full grid place-items-center'>
                        <Image src={IconClose} alt='' className='w-5 h-5' />
                      </div>
                    </div>
                    <Gem type={selectedGems[0]} className='h-10 w-10' />
                  </div>
                )}
              </div>
              <div className='relative'>
                <Image src={GemSlot} alt='' className='w-[87px] h-[93px]' />
                {selectedGems[1] && (
                  <div
                    className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                    onClick={() => setSelectedGems([selectedGems[0], undefined, selectedGems[2]])}>
                    <div className='absolute inset-0 grid place-items-center invisible'>
                      <div className='bg-[#000]/50 h-10 w-10 rounded-full grid place-items-center'>
                        <Image src={IconClose} alt='' className='w-5 h-5' />
                      </div>
                    </div>
                    <Gem type={selectedGems[1]} className='h-10 w-10' />
                  </div>
                )}
              </div>
              <div className='relative'>
                <Image src={GemSlot} alt='' className='w-[87px] h-[93px]' />
                {selectedGems[2] && (
                  <div
                    className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                    onClick={() => setSelectedGems([selectedGems[0], selectedGems[1], undefined])}>
                    <div className='absolute inset-0 grid place-items-center invisible'>
                      <div className='bg-[#000]/50 h-10 w-10 rounded-full grid place-items-center'>
                        <Image src={IconClose} alt='' className='w-5 h-5' />
                      </div>
                    </div>
                    <Gem type={selectedGems[2]} className='h-10 w-10' />
                  </div>
                )}
              </div>
            </div>
            <FilledButton className='mt-8'>Submit</FilledButton>
          </div>
        </div>
      </div>
      <div className='relative'>
        <Image src={TopBar2} alt='' className='w-[352px] relative z-10' />
        <div className='relative bg-[#E6D8B9] rounded-b-[4px] p-4 -top-2 w-[338px] mx-auto text-[#292929]'>
          <div className={`text-[#6D3A0A] font-bold ${Bangkok.className} text-2xl`}>Your Gems</div>
          <div className='mt-2 text-sm'>Select gems here to forge</div>
          <div className='my-4 flex gap-4'>
            <div className='flex-1'>
              <Dropdown>
                <DropdownTrigger>
                  <div className='capitalize bg-[#fff] rounded-md shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)_inset] px-2 py-1 text-[#7A7A7A] text-sm leading-4 flex items-center'>
                    <span className='w-full inline-block'>{selectedColorValue}</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      className='inline-block'>
                      <path
                        d='M6 9L12 15L18 9'
                        stroke='#7A7A7A'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection example'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeys={selectedColorKey}
                  classNames={{
                    base: 'text-[#7a7a7a]',
                  }}
                  onSelectionChange={setSelectedColorKey as any}>
                  <DropdownItem key='all_colors'>All colors</DropdownItem>
                  <DropdownItem key='white'>White</DropdownItem>
                  <DropdownItem key='blue'>Blue</DropdownItem>
                  <DropdownItem key='gold'>Gold</DropdownItem>
                  <DropdownItem key='red'>Red</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='flex-1'>
              <Dropdown>
                <DropdownTrigger>
                  <div className='capitalize bg-[#fff] rounded-md shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)_inset] px-2 py-1 text-[#7A7A7A] text-sm leading-4 flex items-center'>
                    <span className='w-full inline-block'>{selectedRankValue}</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      className='inline-block'>
                      <path
                        d='M6 9L12 15L18 9'
                        stroke='#7A7A7A'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection example'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeys={selectedRankKey}
                  classNames={{
                    base: 'text-[#7a7a7a]',
                  }}
                  onSelectionChange={setSelectedRankKey as any}>
                  <DropdownItem key='all_rank'>All rank</DropdownItem>
                  <DropdownItem key='1-Star'>1-Star</DropdownItem>
                  <DropdownItem key='2-Star'>2-Star</DropdownItem>
                  <DropdownItem key='3-Star'>3-Star</DropdownItem>
                  <DropdownItem key='4-Star'>4-Star</DropdownItem>
                  <DropdownItem key='5-Star'>5-Star</DropdownItem>
                  <DropdownItem key='6-Star'>6-Star</DropdownItem>
                  <DropdownItem key='7-Star'>7-Star</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className='overflow-auto h-[278px] pr-4 grid grid-cols-4 text-sm font-semibold'>
            {['w', 'b', 'g', 'r'].map((color: string) => {
              return ['1', '2', '3', '4', '5', '6', '7'].map((star: string) => {
                if (gems.get(color + star) != 0) {
                  return (
                    <div
                      key={color + star}
                      className='flex flex-col items-center gap-[6px] cursor-pointer'
                      onClick={() => addGemHandler(color + star)}>
                      <div>
                        <GemWithFrame type={(color + star) as any} />
                      </div>
                      <div className=''>{gems.get(color + star)}</div>
                    </div>
                  )
                }
              })
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
