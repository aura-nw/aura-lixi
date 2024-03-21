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
export const RevealForgingResult = ({
  requestId,
  setRequestLoading,
  isOpen,
  onOpenChange,
  requestLoading,
  onClose,
}: any) => {
  const [prize, setPrize] = useState<any>()
  const [result, setResult] = useState()
  const { account, fetchAssets } = useContext(Context)
  const { data } = useSubscription(GET_REQUEST_MANAGER, {
    variables: {
      id: requestId,
    },
  })
  useEffect(() => {
    if (data?.request_manager?.[0]?.response?.code == 200) {
      setResult(data.request_manager[0].response.data.result)
      setPrize(data.request_manager[0].response.data.nftReward.class.toLowerCase())
      setRequestLoading(false)
      fetchAssets()
    }
    if (data?.request_manager?.[0]?.response?.code >= 500) {
      toast(
        data?.request_manager?.[0]?.response?.error?.msg?.[0]?.message || 'Something went wrong. Please try again.',
        { type: 'error' }
      )
      fetchAssets()
      setRequestLoading(false)
    }
  }, [data?.request_manager?.[0]?.response?.code])

  if (requestLoading) {
    return (
      <NoBackgroundModal isOpen onOpenChange={onOpenChange} isLoading>
        <></>
      </NoBackgroundModal>
    )
  }
  if (result == 'FAIL') {
    return (
      <NoBackgroundModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className='flex flex-col items-center text-center'>
          <div className={`font-bold text-[#FB5050] ${Bangkok.className} text-xl`}>
            Sorry!
            <br /> Dragon Gems upgrade failed. Maybe you'll be luckier next time
          </div>
          <div className='relative mt-8'>
            <Image src={SilverRing} alt='' className='w-[158px] h-[168px]' />
            <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
              <Gem type={prize} className='w-20 h-20' />
            </div>
          </div>
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
              <Gem type={prize} className='w-20 h-20' />
            </div>
          </div>
          <div onClick={onClose} className='mt-4'>
            <Image src={IconClose} alt='' className='w-8 h-8 cursor-pointer' />
          </div>
        </div>
      </NoBackgroundModal>
    )
  }
}
