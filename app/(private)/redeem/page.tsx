'use client'
import GemWithFrame from '@/components/gem/gemWithFrame'
import { initList } from '@/constants'
import { Bangkok, Context } from '@/provider'
import { redeem } from '@/services'
import { useChain } from '@cosmos-kit/react'
import { CircularProgress, useDisclosure } from '@nextui-org/react'
import { Map } from 'immutable'
import moment from 'moment'
import getConfig from 'next/config'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Dot from './assets/dot.png'
import TopBarCenter from './assets/top-bar-center.svg'
import TopBarSide from './assets/top-bar-side.svg'
import NoBackgroundModal from '@/components/modal/giftModal'
import GoldRing from '../assets/gold-ring.png'
import Gem from '@/components/gem'
import Link from 'next/link'
import IconClose from '@/assets/ic_close.svg'
export default function Page() {
  const config = getConfig()
  const { address, chain, getSigningCosmWasmClient } = useChain(config.COSMOSKIT_CHAINKEY)
  const { assets, lastAssetsUpdate, fetchAssets, account, setBlackListId } = useContext(Context)
  const [gems, setGems] = useState<any>(Map(initList))
  const [loading, setLoading] = useState('')
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [prize, setPrize] = useState<any>()
  useEffect(() => {
    const gemList = assets.reduce(
      (total, current) => {
        total[current.type]++
        return total
      },
      { ...initList }
    )
    setGems(Map(gemList))
  }, [assets?.length])

  const redeemHandler = async (color: string) => {
    try {
      setLoading(color)
      const tokens: any[] = []
      const msgs = []

      for (let i = 1; i <= 7; i++) {
        const asset = assets.find((a) => a.type == `${color}${i}`)
        tokens.push({
          tokenId: asset?.token_id as string,
          contractAddress: asset?.cw721_contract.smart_contract.address as string,
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
      console.log('redeem', tokens)
      const client = await getSigningCosmWasmClient()
      await client.executeMultiple(
        address as string,
        msgs.map((msg) => ({
          contractAddress: msg.contract as string,
          msg: msg.msg,
        })),
        'auto'
      )
      setPrize(undefined)
      const res = await redeem(tokens)
      if (res.data?.data?.reward) {
        setPrize(res?.data?.data?.reward)
        setBlackListId(((prev: string[]) => {
          const next = [...prev, ...tokens.map((c) => c.tokenId)]
          return next as string[]
        }) as any)
        setLoading('')
        fetchAssets()
        onOpen()
      }
    } catch (error: any) {
      setLoading('')
      console.log(error.message)
      toast(error.message || 'Redeem failed', {
        type: 'error',
      })
    }
  }

  return (
    <>
      <div className='relative w-full px-5 mt-5 md:px-0 md:mt-0'>
        <div className='w-full relative h-3 bg-[conic-gradient(from_180deg_at_50%_50%,#EF6608_60.48818528652191deg,#F8BD25_183.23987245559692deg,#AF3006_338.95015239715576deg)] rounded-[3px]'>
          <Image src={TopBarSide} alt='' className='absolute top-1/2 -translate-y-1/2 left-0 -translate-x-2/3' />
          <Image src={TopBarCenter} alt='' className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
          <Image
            src={TopBarSide}
            alt=''
            className='absolute top-1/2 scale-x-[-1] -translate-y-1/2 right-0 translate-x-2/3'
          />
        </div>
        <div className='mx-auto py-4 px-4 lg:px-8 bg-[#ECE1C8] rounded-b-md w-[calc(100%-24px)] flex flex-col items-center gap-4 relative min-h-[586px]'>
          <div className={`text-[#6D3A0A] ${Bangkok.className} font-bold text-2xl text-center max-w-[60vw]`}>
            Supreme Dragon Gem Fusion
          </div>
          {['w', 'b', 'g', 'r'].map((color: string, index: number) => {
            const count = ['1', '2', '3', '4', '5', '6', '7'].filter((star) => gems.get(color + star)).length
            const percent = Math.ceil((count * 100) / 7)
            return (
              <div
                className='bg-[#D6CCB5] py-4 rounded flex justify-between items-center w-full lg:w-[853px] lg:flex-row-reverse'
                key={index}>
                <div className='mx-4 shrink-0'>
                  <div className='[&>div]:w-20 [&>div]:h-20 [&_img]:h-[70px] [&_img]:w-[70px]'>
                    <GemWithFrame type={`s${color}1` as any} />
                  </div>
                  <div className='w-20 h-6 relative bg-[linear-gradient(180deg,#F2EEE7_0%,#AFA69B_100%)] rounded-2xl overflow-hidden mt-[6px]'>
                    <div
                      style={{ width: `${percent}%` }}
                      className={`absolute top-0 left-0  bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] h-6`}></div>
                    <div
                      id='action_redeem'
                      onClick={() => (count == 7 && !loading ? redeemHandler(color) : undefined)}
                      className={`absolute inset-0 grid place-items-center text-xs ${
                        count == 7 ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${count ? 'text-[#734F34]' : 'text-[#707070]'}`}>
                      {loading == color ? (
                        <CircularProgress
                          classNames={{
                            label: 'text-[#FFF8D5]',
                            indicator: 'stroke-[#8E0B09]',
                            svg: 'w-4 h-4',
                          }}
                          size='sm'
                        />
                      ) : count == 7 ? (
                        'Redeem'
                      ) : (
                        `${count}/7`
                      )}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block mr-4 lg:mr-0 lg:ml-4'>
                  <Image src={Dot} alt='' />
                </div>
                <div className='flex-1 overflow-auto lg:flex-none'>
                  <div className='rounded px-4 py-[10px] flex items-center justify-between min-w-[496px] mr-4 lg:mr-0 lg:ml-4 bg-[#FFF7E4] lg:w-[616px]'>
                    {['1', '2', '3', '4', '5', '6', '7'].map((star: string, index: number) => {
                      return (
                        <div key={index}>
                          <GemWithFrame type={`${color}${star}` as any} />
                          <div
                            className={`w-full text-center font-semibold text-sm ${
                              gems.get(color + star) ? 'text-[#4E8E48]' : 'text-[#DC3535]'
                            }`}>{`${gems.get(color + star)}/1`}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
          <div className='text-xs italic mt-1 ml-2 text-[#000] text-start w-full'>
            {lastAssetsUpdate ? `Last update: ${moment(lastAssetsUpdate).format('HH:mm DD/MM/yyyy')}.` : ''}
            <span className='ml-1'>
              <strong className='cursor-pointer' onClick={fetchAssets}>
                Refresh ⟳
              </strong>
            </span>
          </div>
        </div>
      </div>
      <NoBackgroundModal isOpen={isOpen} onOpenChange={onOpenChange}>
        {prize && (
          <>
            <div className='flex flex-col items-center text-center'>
              <div className={`font-bold text-[#fff] ${Bangkok.className} text-xl`}>
                You’ve received a Supreme Dragon Gem
              </div>
              <div className='relative mt-8'>
                <Image src={GoldRing} alt='' className='w-[158px] h-[168px]' />
                <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
                  <Gem type={prize.type.toLowerCase()} className='w-24 h-24 max-w-none' />
                </div>
              </div>
              <Link
                target='_blank'
                href={`${getConfig().AURASCAN_ENDPOINT}/tokens/cw721/${prize.contract}/${prize.tokenId}`}
                className='text-xs mt-2'>
                ID: <span>{prize.tokenId}</span>
              </Link>
              <div onClick={onClose} className='mt-4'>
                <Image src={IconClose} alt='' className='w-8 h-8 cursor-pointer' />
              </div>
            </div>
          </>
        )}
      </NoBackgroundModal>
    </>
  )
}
