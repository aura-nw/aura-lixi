'use client'
import IconClose from '@/assets/ic_close.svg'
import Gem from '@/components/gem'
import NoBackgroundModal from '@/components/modal/giftModal'
import { Bangkok, Context } from '@/provider'
import { GET_REQUEST_MANAGER } from '@/services'
import { useSubscription } from '@apollo/client'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import GoldRing from '../assets/gold-ring.png'
import SilverRing from '../assets/silver-ring.png'
import ShieldItem from '../assets/shield.png'
import Link from 'next/link'
import getConfig from 'next/config'

export const RevealForgingResult = ({
  requestId,
  isOpen,
  onOpenChange,
  onClose,
  usedShield,
  revealSuccessCallBack,
}: any) => {
  const [prize, setPrize] = useState<any>()
  const [result, setResult] = useState()
  const [requestLoading, setRequestLoading] = useState(true)
  const [isUsedShield, setIsUsedShield] = useState(usedShield)
  const { account, fetchAssets } = useContext(Context)
  const { data } = useSubscription(GET_REQUEST_MANAGER, {
    variables: {
      id: requestId,
    },
  })
  useEffect(() => {
    if (data?.request_manager?.[0]?.response?.code == 200) {
      setResult(data.request_manager[0].response.data.result)
      setPrize(data.request_manager[0].response.data.nftReward)
      setTimeout(() => {
        revealSuccessCallBack()
        setRequestLoading(false)
      }, 10000)
    }
    if (data?.request_manager?.[0]?.response?.code >= 500) {
      setTimeout(() => {
        toast(
          data?.request_manager?.[0]?.response?.error?.msg?.[0]?.message ||
            data?.request_manager?.[0]?.response?.error?.errorMap?.Message ||
            'Something went wrong. Please try again.',
          { type: 'error' }
        )
        onClose()
        setRequestLoading(false)
        revealSuccessCallBack()
      }, 10000)
    }
  }, [data?.request_manager?.[0]?.response?.code])

  if (requestLoading) {
    return (
      <NoBackgroundModal isOpen onOpenChange={onOpenChange} isLoading>
        <></>
      </NoBackgroundModal>
    )
  }
  if (result == 'SUCCESS') {
    return (
      <NoBackgroundModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center text-center'>
          <div className={`font-bold text-[#fff] ${Bangkok.className} text-xl`}>
            Congratulation!
            <br /> Your Dragon Gem has been upgraded successfully
          </div>
          <div className='text-sm mt-4'>
            Congratulation <span className='text-[#FCE57C]'>{account?.username}</span>,<br /> your gem has been uprank
          </div>
          <div className='relative mt-8'>
            <Image src={GoldRing} alt='' className='w-[158px] h-[168px]' />
            <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
              <Gem type={prize.class.toLowerCase()} className='w-20 h-20' />
            </div>
          </div>
          <Link
            target='_blank'
            href={`${getConfig().AURASCAN_ENDPOINT}/tokens/token-nft/${prize.contractAddress}/${prize.tokenId}`}
            className='text-xs mt-2'>
            ID: <span>{prize.tokenId}</span>
          </Link>
          <div onClick={onClose} className='mt-4'>
            <Image src={IconClose} alt='' className='w-8 h-8 cursor-pointer' />
          </div>
        </div>
      </NoBackgroundModal>
    )
  } else {
    return (
      <NoBackgroundModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center text-center'>
          <div className={`font-bold text-[#FB5050] ${Bangkok.className} text-xl`}>
            Sorry!
            <br /> Dragon Gems upgrade failed. Maybe you'll be luckier next time
          </div>
          {isUsedShield && (
            <div className='flex items-center gap-4 mt-4'>
              <Image src={ShieldItem} alt='' className='w-[45px] h-10' />
              <div className='max-w-[238px] text-sm'>
                Phew! The Eternal Shield save your day! Your Dragon Gem is safeguarded
              </div>
            </div>
          )}
          <div className='relative mt-8'>
            <Image src={isUsedShield ? GoldRing : SilverRing} alt='' className='w-[158px] h-[168px]' />
            {prize && (
              <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
                <Gem type={prize.class.toLowerCase()} className='w-20 h-20' />
              </div>
            )}
          </div>
          <Link
            target='_blank'
            href={`${getConfig().AURASCAN_ENDPOINT}/tokens/token-nft/${prize.contractAddress}/${prize.tokenId}`}
            className='text-xs mt-2'>
            ID: <span>{prize.tokenId}</span>
          </Link>
          <div onClick={onClose} className='mt-4'>
            <Image src={IconClose} alt='' className='w-8 h-8 cursor-pointer' />
          </div>
        </div>
      </NoBackgroundModal>
    )
  }
}
