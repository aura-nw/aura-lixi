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
import NoBackgroundModal from '@/components/modal/giftModal'
import { Bangkok, Context } from '@/provider'
import { GET_JACKPOT, GET_USER_JACKPOT, wish } from '@/services'
import { useQuery } from '@apollo/client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import { Map } from 'immutable'
import moment from 'moment'
import Image from 'next/image'
import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import GoldRing from '../assets/gold-ring.png'
import getConfig from 'next/config'
import { useChain } from '@cosmos-kit/react'
import Fire from '@/assets/Fire.png'
import { shorten } from '@/utils'
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
  shield: 0,
}
export default function Page() {
  const config = getConfig()
  const { address, chain, getSigningCosmWasmClient } = useChain(config.COSMOSKIT_CHAINKEY)
  const { assets, lastAssetsUpdate, fetchAssets, account } = useContext(Context)
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
  const [selectedGems, setSelectedGems] = useState<(string | undefined)[]>([])
  const [submittedGems, setSubmittedGems] = useState<(string | undefined)[]>([])
  const [gems, setGems] = useState<any>(Map(initList))
  const { data: jackpotData } = useQuery(GET_JACKPOT)
  const { data: userJackpotData, refetch } = useQuery(GET_USER_JACKPOT, {
    variables: {
      user_id: account?.id,
    },
  })
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const submissionDisclosure = useDisclosure()
  useEffect(() => {
    const gemList = assets.reduce(
      (total, current) => {
        total[current.type]++
        return total
      },
      { ...initList }
    )
    for (let i = 0; i < jackpotData?.jackpots?.[0]?.slot; i++) {
      if (selectedGems[i] != undefined) {
        ;(gemList as any)[selectedGems[i] as string]--
      }
    }
    setGems(Map(gemList))
  }, [selectedGems.filter((g) => !g).length, assets?.length])

  useEffect(() => {
    if (jackpotData?.jackpots?.[0]?.slot) {
      setSelectedGems(new Array(jackpotData?.jackpots?.[0]?.slot).fill(undefined))
    }
  }, [jackpotData?.jackpots])

  const addGemHandler = (type: string) => {
    for (let i = 0; i < jackpotData?.jackpots?.[0]?.slot; i++) {
      if (selectedGems[i] == undefined) {
        selectedGems[i] = type
        break
      }
    }
    setSelectedGems([...selectedGems])
  }

  const wishHandler = async () => {
    try {
      setLoading(true)
      const tokens: any[] = []
      const msgs = []
      for (let i = 0; i < jackpotData?.jackpots?.[0]?.slot; i++) {
        const asset = assets.find((a) => a.type == selectedGems[i] && !tokens.find((g) => g.token_id == a.token_id))
        tokens.push({
          token_id: asset?.token_id as string,
          contract_address: asset?.cw721_contract.smart_contract.address as string,
        })
        msgs.push({
          contract: asset?.cw721_contract.smart_contract.address,
          msg: {
            approve: {
              spender: config.OPERATOR_CONTRACT_ADDRESS,
              token_id: asset?.token_id,
            },
          },
        })
      }
      const client = await getSigningCosmWasmClient()
      await client.executeMultiple(
        address as string,
        msgs.map((msg) => ({
          contractAddress: msg.contract as string,
          msg: msg.msg,
        })),
        'auto'
      )
      const res = await wish(tokens)
      if (res.data) {
        setTimeout(() => {
          setSubmittedGems(selectedGems)
          setSelectedGems([])
          onOpen()
          setLoading(false)
          fetchAssets()
          refetch()
        }, 7000)
      }
    } catch (error: any) {
      setLoading(false)
      console.log(error.message)
      toast(error.message || 'Failed to forge gem', {
        type: 'error',
      })
    }
  }

  return (
    <>
      <NoBackgroundModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center text-center'>
          <div className={`${Bangkok.className} text-xl font-bold`}>Your wish has been sent to the Dragon</div>
          <div className='text-sm mt-4'>
            The Dragon will respond to your
            <br /> wishes at <span className='text-[##FFF7C4]'>12 am, 24th Mar 2024</span>
          </div>
          <div className='mt-8 flex gap-4'>
            {submittedGems.map((gem, index) => (
              <div className='relative mt-8' key={index}>
                <Image src={GoldRing} alt='' className='w-[87px] h-[93px]' />
                <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
                  <Gem type={gem as string} className='w-auto h-auto' />
                </div>
              </div>
            ))}
          </div>
          <div onClick={onClose} className='mt-4'>
            <Image src={IconClose} alt='' className='w-8 h-8 cursor-pointer' />
          </div>
        </div>
      </NoBackgroundModal>
      <NoBackgroundModal isOpen={submissionDisclosure.isOpen} onOpenChange={submissionDisclosure.onOpenChange}>
        <div className='flex items-center gap-8 flex-col'>
          <div className={`${Bangkok.className} text-xl font-bold`}>Submission history</div>
          <div className='max-h-[60vh] overflow-auto'>
            {userJackpotData?.jackpot_users.map((d: any) => (
              <div className='py-3 flex gap-10 border-b border-[#404040]' key={d.updated_at}>
                <div className='p-[10px] text-sm text-[#FFF7C4] w-[150px] whitespace-nowrap'>
                  {moment(d.updated_at).format('h a, Do MMM YYYY')}
                </div>
                <div className='flex gap-5'>
                  {d.purchased_line.split('-').map((d: any, index: number) => (
                    <Gem type={d.toLowerCase() as string} className='w-8 h-8' key={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div onClick={submissionDisclosure.onClose} className='mt-4'>
            <Image src={IconClose} alt='' className='w-8 h-8 cursor-pointer' />
          </div>
        </div>
      </NoBackgroundModal>
      <div className='md:ml-2 flex flex-wrap gap-5 justify-center min-h-[571px]'>
        <div className='relative'>
          <Image src={TopBar} alt='' className='w-[595px] relative z-10' />
          <div className='relative max-w-[544px] mx-3 md:mx-auto -mt-2 rounded-b-[4px] border border-[#ECCB83] p-5 md:p-8 bg-[linear-gradient(180deg,rgba(76,50,36,0.50)_0%,rgba(80,49,38,0.50)_0.01%,rgba(166,123,81,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
            {!!jackpotData?.jackpots &&
              !!userJackpotData?.jackpot_users &&
              (jackpotData?.jackpots?.[0]?.winning_numbers ? (
                jackpotData?.jackpots?.[0]?.winner_address ? (
                  <div className='w-full flex flex-col items-center'>
                    <div className={`text-xl text-center`}>Congratulation!</div>
                    <div className={`${Bangkok.className} text-[#FEF368] text-xl font-bold text-center my-1`}>
                      Dragon Warrior
                    </div>
                    <div className='text-sm text-[#FFF7C4]'>24th March 2024</div>
                    <div className='border-[3px] border-[#E3B480] bg-[rgba(0,0,0,0.39)] rounded p-[10px] text-sm mt-9'>
                      {shorten(jackpotData?.jackpots?.[0]?.winner_address,8,8)}
                    </div>
                    <div className='flex gap-5 relative mt-24 mb-28'>
                      {/* <Image src={Fire} alt='' className='absolute left-1/2 -translate-x-1/2 -bottom-10' /> */}
                      {jackpotData?.jackpots?.[0]?.winning_numbers.split('-').map((gem: any, index: number) => (
                        <div className='relative' key={index}>
                          <Image src={GoldRing} alt='' className='w-[127px] h-[136px]' />
                          <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
                            <Gem type={gem.toLowerCase()} className='w-[73px] h-[73px]' />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex flex-col items-center'>
                    <div className={`${Bangkok.className} text-[#FEF368] text-xl font-bold text-center`}>
                      The Dragon's Wish
                      <br /> has been revealed
                    </div>
                    <div className='text-sm mt-2'>The chosen one might still be YOU!!!</div>
                    <div className='flex gap-5 relative my-36'>
                      {/* <Image src={Fire} alt='' className='absolute left-1/2 -translate-x-1/2 -bottom-10' /> */}
                      {jackpotData?.jackpots?.[0]?.winning_numbers.split('-').map((gem: any, index: number) => (
                        <div className='relative' key={index}>
                          <Image src={GoldRing} alt='' className='w-[127px] h-[136px]' />
                          <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
                            <Gem type={gem.toLowerCase()} className='w-[73px] h-[73px]' />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div className='absolute inset-x-0 top-28 grid place-items-center'>
                    <Image src={JackpotBg} alt='' className='w-[314px] h-[297px]' />
                  </div>
                  <div className='relative mt-5 flex flex-col items-center'>
                    <div>
                      <Image src={Machine} alt='' className='w-[236px] h-[252px]' />
                    </div>
                    <div className='text-xs text-[#FFFFFF] mt-8 text-center'>
                      {`The Dragon will appear and fulfill your wish at ${moment()
                        .add(14, 'd')
                        .format('h a, Do MMM YYYY')} (UTC +7)`}
                    </div>
                    <div className='mt-4 flex gap-4 flex-wrap max-w-[90vw] items-center justify-center'>
                      {[...(Array(jackpotData.jackpots?.[0]?.slot).keys() as any)].map((index) => (
                        <div className='relative' key={index}>
                          <Image src={GemSlot} alt='' className='w-[87px] h-[93px]' />
                          {selectedGems[index] && (
                            <div
                              className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                              onClick={() => {
                                const newData = [...selectedGems]
                                newData[index] = undefined
                                setSelectedGems(newData)
                              }}>
                              <div className='absolute inset-0 grid place-items-center invisible'>
                                <div className='bg-[#000]/50 h-10 w-10 rounded-full grid place-items-center'>
                                  <Image src={IconClose} alt='' className='w-5 h-5' />
                                </div>
                              </div>
                              <Gem type={selectedGems[index] as string} className='h-10 w-10' />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className='italic text-xs text-[#FFF7C4] text-center mt-1'>
                      {(function () {
                        switch (jackpotData?.jackpots?.[0]?.max_star) {
                          case 2:
                            return 'At this phase, you can only submit 1-star & 2-star gems.'

                          default:
                            return ''
                        }
                      })()}
                    </div>

                    <FilledButton
                      className='mt-5'
                      disabled={selectedGems.filter((g) => g).length != jackpotData?.jackpots?.[0]?.slot}
                      onClick={wishHandler}
                      isLoading={loading}>
                      Wish
                    </FilledButton>
                  </div>
                </>
              ))}
          </div>
        </div>

        <div className='relative'>
          <Image src={TopBar2} alt='' className='w-[352px] relative z-10' />
          <div className='relative bg-[#E6D8B9] rounded-b-[4px] p-4 -top-2 w-[338px] mx-auto text-[#292929]'>
            <div className='flex justify-between gap-1 items-center'>
              <div className={`text-[#6D3A0A] font-bold ${Bangkok.className} text-2xl`}>Your Gems</div>
              {!!userJackpotData?.jackpot_users?.length && (
                <FilledButton onClick={submissionDisclosure.onOpen}>
                  <div className='flex -mx-7 items-center'>
                    <span className='text-xs'>Submission History</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='11'
                      height='10'
                      viewBox='0 0 11 10'
                      fill='none'
                      className='ml-1'>
                      <path
                        d='M5.80933 3V5L7.05933 6.25'
                        stroke='#6D3A0A'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M1.97831 2.43557L1.60331 2.43707C1.60371 2.53592 1.64312 2.63061 1.71297 2.70056C1.78282 2.7705 1.87746 2.81004 1.97631 2.81057L1.97831 2.43557ZM3.24931 2.81657C3.29856 2.8168 3.34737 2.80732 3.39295 2.78869C3.43854 2.77006 3.48001 2.74263 3.51499 2.70797C3.54998 2.67331 3.57779 2.6321 3.59685 2.58669C3.61591 2.54128 3.62583 2.49256 3.62606 2.44332C3.62629 2.39407 3.61682 2.34526 3.59819 2.29968C3.57956 2.25409 3.55213 2.21262 3.51747 2.17764C3.48281 2.14265 3.4416 2.11484 3.39619 2.09578C3.35078 2.07672 3.30206 2.0668 3.25281 2.06657L3.24931 2.81657ZM2.34681 1.16057C2.34655 1.11132 2.33659 1.06261 2.3175 1.01721C2.29841 0.971816 2.27057 0.930624 2.23556 0.895987C2.20056 0.861351 2.15907 0.833949 2.11347 0.815346C2.06787 0.796744 2.01906 0.787304 1.96981 0.787567C1.92057 0.787829 1.87186 0.797789 1.82646 0.816877C1.78106 0.835965 1.73987 0.863808 1.70523 0.898816C1.6706 0.933823 1.6432 0.97531 1.62459 1.02091C1.60599 1.06651 1.59655 1.11532 1.59681 1.16457L2.34681 1.16057ZM1.72281 4.39257C1.73 4.34356 1.7274 4.29361 1.71518 4.24561C1.70295 4.19761 1.68133 4.1525 1.65158 4.1129C1.62182 4.0733 1.58451 4.03999 1.54181 4.01489C1.49911 3.98978 1.45186 3.97339 1.40278 3.96666C1.35371 3.95992 1.30379 3.96297 1.2559 3.97564C1.20801 3.9883 1.16311 4.01033 1.12378 4.04044C1.08445 4.07056 1.05148 4.10817 1.02677 4.1511C1.00206 4.19403 0.986102 4.24143 0.979814 4.29057L1.72281 4.39257ZM9.24031 1.56907C7.33031 -0.340933 4.24381 -0.360933 2.34631 1.53707L2.87631 2.06707C4.47631 0.467567 7.08781 0.477067 8.71031 2.09907L9.24031 1.56907ZM2.37831 8.43107C4.28831 10.3411 7.37481 10.3611 9.27231 8.46307L8.74231 7.93307C7.14231 9.53257 4.53081 9.52307 2.90831 7.90107L2.37831 8.43107ZM9.27231 8.46307C11.1698 6.56557 11.1503 3.47907 9.24031 1.56907L8.71031 2.09907C10.3323 3.72157 10.3418 6.33307 8.74231 7.93307L9.27231 8.46307ZM2.34631 1.53707L1.71281 2.17007L2.24331 2.70007L2.87631 2.06707L2.34631 1.53707ZM1.97631 2.81057L3.24931 2.81657L3.25281 2.06657L1.98031 2.06057L1.97631 2.81057ZM2.35331 2.43357L2.34681 1.16057L1.59681 1.16457L1.60331 2.43707L2.35331 2.43357ZM0.979314 4.29007C0.876584 5.04136 0.949403 5.80623 1.19205 6.52464C1.4347 7.24305 1.84058 7.89543 2.37781 8.43057L2.90781 7.90057C2.45243 7.44721 2.10837 6.89443 1.90267 6.28566C1.69697 5.6769 1.63523 5.02872 1.72231 4.39207L0.979314 4.29007Z'
                        fill='#6D3A0A'
                      />
                    </svg>
                  </div>
                </FilledButton>
              )}
            </div>
            <div className='mt-2 text-sm'>Select gems here to wish</div>
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
                    onSelectionChange={setSelectedRankKey as any}
                    items={[...(Array(jackpotData?.jackpots?.[0]?.max_star + 1 || 8).keys() as any)].map((star) =>
                      star == 0
                        ? {
                            key: 'all_rank',
                            label: 'All Rank',
                          }
                        : {
                            key: star + '-Star',
                            label: star + '-Star',
                          }
                    )}>
                    {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className='overflow-auto h-[394px] pr-4 grid grid-cols-4 text-sm font-semibold auto-rows-min gap-4'>
              {['w', 'b', 'g', 'r']
                .filter(
                  (c) => Array.from(selectedColorKey)[0] == 'all_colors' || Array.from(selectedColorKey)[0][0] == c
                )
                .map((color: string) => {
                  return [...(Array(jackpotData?.jackpots?.[0]?.max_star || 7).keys() as any)]
                    .map((v) => v + 1)
                    .filter(
                      (s) => Array.from(selectedRankKey)[0] == 'all_rank' || Array.from(selectedRankKey)[0][0] == s
                    )
                    .map((star: string) => {
                      if (gems.get(color + star) != 0) {
                        return (
                          <div
                            key={color + star}
                            className={`flex flex-col items-center gap-[6px] h-fit ${'cursor-pointer'}`}
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
            <div className='text-xs italic mt-1 ml-2'>
              {lastAssetsUpdate ? `Last update: ${moment(lastAssetsUpdate).format('HH:mm DD/MM/yyyy')}.` : ''}
              <span className='ml-1'>
                <strong className='cursor-pointer' onClick={fetchAssets}>
                  Refresh ⟳
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
