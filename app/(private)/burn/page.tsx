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
import ForgeBg from '../assets/force-bg.svg'
import GemSlot from '../assets/gem-slot.svg'
import GemSlotActive from '../assets/gem-slot_active.svg'
import Shield from '../assets/shield.svg'
import TopBar2 from '../assets/top-bar-2.svg'
import TopBar from '../assets/top-bar.svg'
import TopBarMobile from '../assets/top-bar_mobile.svg'
import { RevealForgingResult } from '../components/revealForgingResult'
import { initList } from '@/constants'

export default function Home() {
  const config = getConfig()
  const { assets, lastAssetsUpdate, fetchAssets, setBlackListId } = useContext(Context)
  const { address, chain, getSigningCosmWasmClient } = useChain(config.COSMOSKIT_CHAINKEY)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [tempBlackList, setTempBlackList] = useState<any[]>([])
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
  const [list, setList] = useState<any[]>([])
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
    const index = list.findIndex((gem) => gem.type == type)
    if (index == -1) {
      const newList = [
        ...list,
        {
          type,
          amount: 0,
        },
      ]
      setList(newList)
    } else {
      setList((prev) => {
        const newList = prev.filter((gem) => gem.type != type)
        return [...newList]
      })
    }
  }

  const forgeGemHandler = async () => {
    try {
      setLoading(true)
      const bl = []
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
      bl.push(main?.token_id)

      const material: any[] = []
      for (let i = 0; i < 5; i++) {
        if (materialGems[i] != undefined) {
          const asset = assets.find(
            (a) =>
              a.type == materialGems[i] &&
              !material.find((g) => g.tokenId == a.token_id) &&
              main?.token_id != a.token_id
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
          bl.push(asset?.token_id)
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
        bl.push(shield?.token_id)
      }
      setTempBlackList(bl)
      console.log('forge', main, material, shield)
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
          result?.data?.data?.requestId
            ? `Reveal gem with request ${
                result?.data?.data?.requestId
              } failed. Please contact us via Discord or Telegram. Respone: ${JSON.stringify(result?.data)}`
            : `Can not fetch your request ID. Please contact us via Discord or Telegram. Respone: ${JSON.stringify(
                result?.data
              )}`,
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
          revealSuccessCallBack={(result: string) => {
            setBlackListId(((prev: string[]) => {
              const next = [...prev, ...(result == 'success' ? tempBlackList : tempBlackList.slice(1))]
              return next as string[]
            }) as any)
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
          <div className='relative w-[342px] md:w-[544px] mx-auto -mt-2 rounded-b-[4px] border border-[#ECCB83] p-4 md:p-8 bg-[linear-gradient(180deg,rgba(76,50,36,0.50)_0%,rgba(80,49,38,0.50)_0.01%,rgba(166,123,81,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px]'>
            <div className='relative'>
              {assets.length ? (
                <div className=''>
                  <div className={`text-[#fff] font-bold ${Bangkok.className} text-2xl`}>Your Gems</div>
                  <div className='mt-2 text-sm'>Select gems and fill the quantity to burn</div>
                  <div className='my-4 flex gap-4'>
                    <div className='w-full max-w-[145px]'>
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
                    <div className='w-full max-w-[145px]'>
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
                  <div className='overflow-auto flex flex-wrap gap-4 text-sm font-semibold'>
                    {['w', 'b', 'g', 'r']
                      .filter(
                        (c) =>
                          Array.from(selectedColorKey)[0] == 'all_colors' || Array.from(selectedColorKey)[0][0] == c
                      )
                      .map((color: string) => {
                        return ['1', '2', '3', '4', '5', '6', '7']
                          .filter(
                            (s) =>
                              Array.from(selectedRankKey)[0] == 'all_rank' || Array.from(selectedRankKey)[0][0] == s
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
                                  className={`flex flex-col items-center gap-[6px] h-fit cursor-pointer relative`}
                                  onClick={() => addGemHandler(color + star)}>
                                  {list.findIndex((gem) => gem.type == color + star) >= 0 ? (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='17'
                                      height='16'
                                      viewBox='0 0 17 16'
                                      className='absolute top-[3px] right-[3px]'
                                      fill='none'>
                                      <path
                                        d='M13.5833 4L6.24999 11.3333L2.91666 8'
                                        stroke='#A0FF04'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                      />
                                    </svg>
                                  ) : (
                                    <></>
                                  )}
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
                  <div className='text-xs italic mt-3'>
                    {lastAssetsUpdate ? `Last update: ${moment(lastAssetsUpdate).format('HH:mm DD/MM/yyyy')}.` : ''}
                    <span className='ml-1'>
                      <strong className='cursor-pointer' onClick={fetchAssets}>
                        Refresh ⟳
                      </strong>
                    </span>
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
        <div className='relative'>
          <Image src={TopBar2} alt='' className='w-[352px] relative z-10' />
          <div className='relative bg-[#E6D8B9] rounded-b-[4px] py-8 px-4 -top-2 w-[338px] mx-auto text-[#292929] flex flex-col gap-4'>
            <div>
              <div className={`text-[#6D3A0A] font-bold ${Bangkok.className} text-2xl`}>Burn Gems</div>
              <div className='mt-2 text-sm'>Select number and Burn</div>
            </div>
            <div className='flex flex-col gap-4 max-h-[370px] my-4 overflow-auto'>
              {list.length ? (
                list.map((gem) => {
                  return (
                    <div key={gem.type} className='p-[10px] rounded-[4px] flex gap-4 bg-[#D6CCB5]'>
                      <GemWithFrame type={gem.type as any} />
                      <div className='flex flex-col gap-1'>
                        <div className='text-[#545454] text-xs'>
                          {`${(function () {
                            switch (gem.type[0]) {
                              case 'w':
                                return 'White'
                              case 'b':
                                return 'Blue'
                              case 'g':
                                return 'Gold'
                              case 'r':
                                return 'Red'
                            }
                          })()} Gem ${gem.type[1]}`}
                        </div>
                        <div className='flex items-center gap-4'>
                          <input
                            type='number'
                            onChange={(e) => {
                              const v = e.target.value as any
                              const newList = [...list]
                              const index = newList.findIndex((g) => g.type == gem.type)
                              newList[index].amount = !isNaN(v) ? v : '0'
                              setList(newList)
                            }}
                            className='text-sm text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center w-full'
                          />
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='10'
                            height='10'
                            viewBox='0 0 10 10'
                            fill='none'
                            className='cursor-pointer'
                            onClick={() => addGemHandler(gem.type)}>
                            <path
                              d='M9 1L1 9'
                              stroke='#885E23'
                              stroke-width='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M1 1L9 9'
                              stroke='#885E23'
                              stroke-width='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className='text-sm text-center w-full'>No gems selected</div>
              )}
            </div>
            <FilledButton className='w-fit mx-auto' onClick={() => console.log(list)}>
              Burn
            </FilledButton>
          </div>
        </div>
      </div>
    </>
  )
}
