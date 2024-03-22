'use client'
import IconClose from '@/assets/ic_close.svg'
import ShieldItem from '@/assets/mat khien.png'
import FilledButton from '@/components/button/filled'
import Checkbox from '@/components/checkbox'
import Gem from '@/components/gem'
import GemWithFrame from '@/components/gem/gemWithFrame'
import { Bangkok, Context } from '@/provider'
import { forgeGem } from '@/services'
import { useChain } from '@cosmos-kit/react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import Immutable, { Map } from 'immutable'
import moment from 'moment'
import getConfig from 'next/config'
import Image from 'next/image'
import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import ForgeBg from './assets/force-bg.svg'
import GemSlot from './assets/gem-slot.svg'
import GemSlotActive from './assets/gem-slot_active.svg'
import Shield from './assets/shield.svg'
import TopBar2 from './assets/top-bar-2.svg'
import TopBar from './assets/top-bar.svg'
import TopBarMobile from './assets/top-bar_mobile.svg'
import { RevealForgingResult } from './components/revealForgingResult'
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
export default function Home() {
  const config = getConfig()
  const { assets, lastAssetsUpdate, fetchAssets } = useContext(Context)
  const { address, chain, getSigningCosmWasmClient } = useChain(config.COSMOSKIT_CHAINKEY)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [requestId, setRequestId] = useState()
  const [loading, setLoading] = useState(false)
  const [useShield, setUseShield] = useState(false)
  const [activeSlot, setActiveSlot] = useState(0)
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

  const [mainGem, setMainGem] = useState<string | undefined>()
  const [materialGems, setMaterialGems] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ])
  const [gems, setGems] = useState<Immutable.MapOf<any>>(Map(initList))

  useEffect(() => {
    if (!mainGem) {
      setActiveSlot(0)
    } else {
      for (let i = 0; i < 5; i++) {
        if (materialGems[i] == undefined) {
          setActiveSlot(i + 1)
          break
        }
      }
    }
    const gemList = assets.reduce(
      (total, current) => {
        total[current.type]++
        return total
      },
      { ...initList }
    )
    if (mainGem) {
      ;(gemList as any)[mainGem]--
    }
    for (let i = 0; i < 5; i++) {
      if (materialGems[i] != undefined) {
        ;(gemList as any)[materialGems[i] as string]--
      }
    }
    setGems(Map(gemList))
  }, [mainGem, materialGems, assets?.length])

  const addGemHandler = (type: string) => {
    if (loading) return
    if (!mainGem) {
      setMainGem(type)
    } else {
      for (let i = 0; i < 5; i++) {
        if (materialGems[i] == undefined) {
          materialGems[i] = type
          break
        }
      }
      setMaterialGems([...materialGems])
    }
  }

  const forgeGemHandler = async () => {
    try {
      setLoading(true)
      const main = assets.find((asset) => asset.type == mainGem)
      const msgs = [
        {
          contract: main?.cw721_contract.smart_contract.address,
          msg: {
            approve: {
              spender: config.OPERATOR_CONTRACT_ADDRESS,
              token_id: main?.token_id,
            },
          },
        },
      ]

      const material: any[] = []
      for (let i = 0; i < 5; i++) {
        if (materialGems[i] != undefined) {
          const asset = assets.find(
            (a) => a.type == materialGems[i] && !material.find((g) => g.tokenId == a.token_id)
          )
          material.push({
            contractAddress: asset?.cw721_contract.smart_contract.address as string,
            tokenId: asset?.token_id as string,
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
      }
      let shield
      if (useShield) {
        shield = assets.find((asset) => asset.type == 'shield')
        msgs.push({
          contract: shield?.cw721_contract.smart_contract.address,
          msg: {
            approve: {
              spender: config.OPERATOR_CONTRACT_ADDRESS,
              token_id: shield?.token_id,
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

      const result = await forgeGem(
        {
          contractAddress: main?.cw721_contract.smart_contract.address as string,
          tokenId: main?.token_id as string,
        },
        material,
        useShield
          ? {
              contractAddress: shield?.cw721_contract.smart_contract.address as string,
              tokenId: shield?.token_id as string,
            }
          : undefined
      )

      if (result?.data?.data?.requestId) {
        setRequestId(result?.data?.data?.requestId)
        console.log('revealing request id:', result?.data?.data?.requestId)
        onOpen()
      } else {
        toast(
          `Reveal gem with request ${
            result?.data?.data?.requestId
          } failed. Please contact us via Discord or Telegram. Respone: ${JSON.stringify(result?.data)}`,
          {
            type: 'error',
          }
        )
        onClose()
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error)
      toast(error.message || 'Failed to forge gem', {
        type: 'error',
      })
    }
  }

  return (
    <>
      {requestId && (
        <RevealForgingResult
          requestId={requestId}
          usedShield={useShield}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={() => {
            onClose()
            setTimeout(() => setRequestId(undefined), 500)
          }}
          revealSuccessCallBack={() => {
            setMainGem(undefined)
            setMaterialGems([undefined, undefined, undefined, undefined, undefined])
            setUseShield(false)
            fetchAssets()
          }}
        />
      )}
      <div className='flex flex-wrap gap-5 md:gap-2 justify-center'>
        <div className='relative'>
          <Image src={TopBar} alt='' className='w-[595px] relative z-10 hidden md:block' />
          <Image src={TopBarMobile} alt='' className='w-[372px] relative z-10 md:hidden' />
          <div className='relative w-[342px] md:w-[544px] mx-auto -mt-2 rounded-b-[4px] border border-[#ECCB83] p-8 bg-[linear-gradient(180deg,rgba(76,50,36,0.50)_0%,rgba(80,49,38,0.50)_0.01%,rgba(166,123,81,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
            <div className='absolute inset-x-0 top-10 grid place-items-center'>
              <Image src={ForgeBg} alt='' className='w-[282px] h-[290px] md:w-[443px] md:h-[457px]' />
            </div>
            <div className='relative mt-5 '>
              <div className='w-[263px] md:w-[415px] h-[246px] md:h-[388px] relative mx-auto'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2'>
                  <Image
                    src={activeSlot == 1 ? GemSlotActive : GemSlot}
                    alt=''
                    className='w-[60px] md:w-[87px] h-[64px] md:h-[93px]'
                  />
                  {materialGems[0] && (
                    <div
                      className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                      onClick={() => {
                        if (loading) return
                        setMaterialGems([undefined, materialGems[1], materialGems[2], materialGems[3], materialGems[4]])
                      }}>
                      <div className='absolute inset-0 grid place-items-center invisible'>
                        <div className='bg-[#000]/50 h-7 md:h-10 w-7 md:w-10 rounded-full grid place-items-center'>
                          <Image src={IconClose} alt='' className='w-5 h-5' />
                        </div>
                      </div>
                      <Gem type={materialGems[0]} className='h-7 md:h-10 w-7 md:w-10' />
                    </div>
                  )}
                </div>

                <div className='absolute left-0 top-[40%] -translate-y-1/2'>
                  <Image
                    src={activeSlot == 5 ? GemSlotActive : GemSlot}
                    alt=''
                    className='w-[60px] md:w-[87px] h-[64px] md:h-[93px]'
                  />
                  {materialGems[4] && (
                    <div
                      className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                      onClick={() => {
                        if (loading) return
                        setMaterialGems([materialGems[0], materialGems[1], materialGems[2], materialGems[3], undefined])
                      }}>
                      <div className='absolute inset-0 grid place-items-center invisible'>
                        <div className='bg-[#000]/50 h-7 md:h-10 w-7 md:w-10 rounded-full grid place-items-center'>
                          <Image src={IconClose} alt='' className='w-5 h-5' />
                        </div>
                      </div>
                      <Gem type={materialGems[4]} className='h-7 md:h-10 w-7 md:w-10' />
                    </div>
                  )}
                </div>

                <div className='absolute right-0 top-[40%] -translate-y-1/2'>
                  <Image
                    src={activeSlot == 2 ? GemSlotActive : GemSlot}
                    alt=''
                    className='w-[60px] md:w-[87px] h-[64px] md:h-[93px]'
                  />
                  {materialGems[1] && (
                    <div
                      className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                      onClick={() => {
                        if (loading) return
                        setMaterialGems([materialGems[0], undefined, materialGems[2], materialGems[3], materialGems[4]])
                      }}>
                      <div className='absolute inset-0 grid place-items-center invisible'>
                        <div className='bg-[#000]/50 h-7 md:h-10 w-7 md:w-10 rounded-full grid place-items-center'>
                          <Image src={IconClose} alt='' className='w-5 h-5' />
                        </div>
                      </div>
                      <Gem type={materialGems[1]} className='h-7 md:h-10 w-7 md:w-10' />
                    </div>
                  )}
                </div>

                <div className='absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <Image
                    src={activeSlot == 0 ? GemSlotActive : GemSlot}
                    alt=''
                    className='md:w-[157px] w-[100px] md:h-[168px] h-[107px]'
                  />
                  {mainGem && (
                    <div
                      className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                      onClick={() => {
                        if (loading) return
                        setMainGem(undefined)
                      }}>
                      <div className='absolute inset-0 grid place-items-center invisible'>
                        <div className='bg-[#000]/50 h-10 w-10 md:h-20 md:w-20 rounded-full grid place-items-center'>
                          <Image src={IconClose} alt='' className='w-5 h-5 md:w-10 md:h-10' />
                        </div>
                      </div>
                      <Gem type={mainGem} className='h-10 w-10 md:h-20 md:w-20' />
                    </div>
                  )}
                </div>

                <div className='absolute left-[10%] bottom-0'>
                  <Image
                    src={activeSlot == 4 ? GemSlotActive : GemSlot}
                    alt=''
                    className='w-[60px] md:w-[87px] h-[64px] md:h-[93px]'
                  />
                  {materialGems[3] && (
                    <div
                      className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                      onClick={() => {
                        if (loading) return
                        setMaterialGems([materialGems[0], materialGems[1], materialGems[2], undefined, materialGems[4]])
                      }}>
                      <div className='absolute inset-0 grid place-items-center invisible'>
                        <div className='bg-[#000]/50 h-7 md:h-10 w-7 md:w-10 rounded-full grid place-items-center'>
                          <Image src={IconClose} alt='' className='w-5 h-5' />
                        </div>
                      </div>
                      <Gem type={materialGems[3]} className='h-7 md:h-10 w-7 md:w-10' />
                    </div>
                  )}
                </div>
                <div className='absolute right-[10%] bottom-0'>
                  <Image
                    src={activeSlot == 3 ? GemSlotActive : GemSlot}
                    alt=''
                    className='w-[60px] md:w-[87px] h-[64px] md:h-[93px]'
                  />
                  {materialGems[2] && (
                    <div
                      className='absolute inset-0 grid place-items-center cursor-pointer [&>div]:hover:visible'
                      onClick={() => {
                        if (loading) return
                        setMaterialGems([materialGems[0], materialGems[1], undefined, materialGems[3], materialGems[4]])
                      }}>
                      <div className='absolute inset-0 grid place-items-center invisible'>
                        <div className='bg-[#000]/50 h-7 md:h-10 w-7 md:w-10 rounded-full grid place-items-center'>
                          <Image src={IconClose} alt='' className='w-5 h-5' />
                        </div>
                      </div>
                      <Gem type={materialGems[2]} className='h-7 md:h-10 w-7 md:w-10' />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`mx-auto w-fit flex items-center mt-10 md:mt-20 gap-3 cursor-pointer ${
                  assets.filter((asset) => asset.type == 'shield').length ? '' : 'opacity-50 pointer-events-none'
                }`}
                onClick={() =>
                  assets.filter((asset) => asset.type == 'shield').length && !loading
                    ? setUseShield(!useShield)
                    : undefined
                }>
                <Checkbox checked={useShield} />
                <div className='text-sm'>Activate the Eternal Shield</div>
                <Image src={Shield} alt='' className='w-[45px] h-[41px]' />
              </div>
              <div className='mt-4 w-fit mx-auto'>
                <FilledButton
                  isLoading={loading}
                  onClick={forgeGemHandler}
                  disabled={!mainGem || !materialGems.find((g) => g)?.length}>
                  Forge
                </FilledButton>
              </div>
            </div>
          </div>
        </div>
        <div className='relative'>
          <Image src={TopBar2} alt='' className='w-[352px] relative z-10' />
          <div className='relative bg-[#E6D8B9] rounded-b-[4px] p-4 -top-2 w-[338px] mx-auto text-[#292929]'>
            {assets.length ? (
              <div className='min-h-[622px]'>
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
                <div className='overflow-auto h-[278px] pr-4 grid gap-4 grid-cols-4 auto-rows-min text-sm font-semibold'>
                  {['w', 'b', 'g', 'r']
                    .filter(
                      (c) => Array.from(selectedColorKey)[0] == 'all_colors' || Array.from(selectedColorKey)[0][0] == c
                    )
                    .map((color: string) => {
                      return ['1', '2', '3', '4', '5', '6', '7']
                        .filter(
                          (s) => Array.from(selectedRankKey)[0] == 'all_rank' || Array.from(selectedRankKey)[0][0] == s
                        )
                        .map((star: string) => {
                          if (gems.get(color + star) != 0) {
                            return (
                              <div
                                title={
                                  activeSlot == 0 && star == '7'
                                    ? 'The gem has reached the max power level and cannot be upgraded.'
                                    : ''
                                }
                                key={color + star}
                                className={`flex flex-col items-center gap-[6px] h-fit ${
                                  activeSlot == 0 && star == '7' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                                onClick={() =>
                                  activeSlot == 0 && star == '7' ? undefined : addGemHandler(color + star)
                                }>
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
                <div className={`text-[#6D3A0A] font-bold ${Bangkok.className} text-2xl mt-2`}>
                  Your Eternal Shields
                </div>
                <div className='mt-2 text-sm'>
                  Eternal Shields are used to Protect Dragon Gem from dropping levels if the forging fails
                </div>
                <div className='flex mt-4'>
                  <div className='flex flex-col items-center gap-[6px] cursor-pointer'>
                    <div>
                      <Image src={ShieldItem} alt='' />
                    </div>
                    <div className=''>{assets.filter((asset) => asset.type == 'shield').length}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center text-center min-h-[622px]'>
                <div className={`text-[#6D3A0A] font-bold ${Bangkok.className} text-2xl`}>No Gems Found</div>
                <div className='mt-2 mb-4 text-sm'>Let's find some Gems on SeekHYPE marketplace!</div>
                <FilledButton href={config.SEEKHYPE_DRAGON_COLLECTION_ENDPOINT} target='_blank'>
                  Go to SeekHype
                </FilledButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
