'use client'
import BlueLixi from '@/assets/blue-lixi.svg'
import GoldLixi from '@/assets/gold-lixi.svg'
import LixiStageImg from '@/assets/lixi-stage.svg'
import Lixi from '@/assets/lixi.svg'
import RedLixi from '@/assets/red-lixi.svg'
import { Bangkok, Context, Go3 } from '@/context'
import { GET_LIXI, GET_REQUEST_MANAGER, openLixi } from '@/services'
import { formatNumber, fromMicro } from '@/utils'
import { useSubscription } from '@apollo/client'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import GiftModal from '../modal/giftModal'
import RedGem from '@/assets/red-gem.svg'
import BlueGem from '@/assets/blue-gem.svg'
import GoldGem from '@/assets/gold-gem.svg'
import WhiteGem from '@/assets/white-gem.svg'
export default function LixiStage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data, loading } = useSubscription(GET_LIXI)
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestId, setRequestId] = useState(undefined)
  const openHandler = async () => {
    try {
      const res = await openLixi(data.lixi[0].id)
      if (res?.data?.data?.requestId) {
        setRequestId(res?.data?.data?.requestId)
        setRequestLoading(true)
        onOpen()
      } else {
        throw new Error('Open Li Xi failed. Please try again')
      }
    } catch (error: any) {
      alert(error?.message || 'Something went wrong. Please try again')
      onClose()
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setRequestId(undefined)
    }
  }, [isOpen])
  return (
    <>
      {requestId && (
        <Result
          requestId={requestId}
          setRequestLoading={setRequestLoading}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          requestLoading={requestLoading}
        />
      )}

      <div className='relative flex flex-col items-center w-full xl:w-fit xl:mx-0 mx-auto mb-[9.2rem]'>
        <Image src={Lixi} alt='' className='mt-20 relative z-[2] -mb-3' />
        <Image src={LixiStageImg} alt='' className='relative z-[1]' />
        <div className='absolute z-[3] top-[19.75rem] flex flex-col items-center'>
          <button
            onClick={openHandler}
            disabled={!data?.lixi?.length}
            className=' text-[#6D3A0A] font-semibold p-[10px] rounded-2xl bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] disabled:text-[#6b6b6b] disabled:bg-[linear-gradient(180deg,#EFEBE4_0%,#B3AAA0_100%)] flex items-center gap-2 h-10 w-[149px] justify-center'>
            OPEN
          </button>
          <div className='mt-10 text-[#F9E2A4] text-sm leading-[18px] min-h-[18px]'>
            {!loading && !data?.lixi?.length && `You don’t have any Li Xi, refer your friends to earn more.`}
          </div>
          <div className='flex mt-4 relative z-[2] gap-1'>
            <Image src={RedLixi} alt='' className='w-[105px] h-[108px]' />
            <Image src={GoldLixi} alt='' className='w-[105px] h-[108px]' />
            <Image src={BlueLixi} alt='' className='w-[105px] h-[108px]' />
          </div>
          <div className='relative grid place-items-center w-[347px] h-[83px] -mt-8 z-[1] rounded-md border-[5px] border-[#EDB48D] bg-[#B43325] shadow-[0px_4px_9.9px_0px_rgba(0,0,0,0.10),0px_4px_4px_0px_rgba(0,0,0,0.25)] '>
            <div className='flex w-[286px] justify-between absolute bottom-[11px]'>
              <div
                className={`${Go3.className} h-[22px] rounded-2xl px-[10px] text-center min-w-[54px] bg-[#860204] shadow-[0px_2px_3.5px_0px_rgba(0,0,0,0.10)_inset] `}>
                {data?.lixi?.filter((d: any) => d.type == 'RED').length || 0}
              </div>
              <div
                className={`${Go3.className} h-[22px] rounded-2xl px-[10px] text-center min-w-[54px] bg-[#860204] shadow-[0px_2px_3.5px_0px_rgba(0,0,0,0.10)_inset] `}>
                {data?.lixi?.filter((d: any) => d.type == 'GOLD').length || 0}
              </div>
              <div
                className={`${Go3.className} h-[22px] rounded-2xl px-[10px] text-center min-w-[54px] bg-[#860204] shadow-[0px_2px_3.5px_0px_rgba(0,0,0,0.10)_inset] `}>
                {data?.lixi?.filter((d: any) => d.type == 'BLUE').length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const Result = ({ requestId, setRequestLoading, isOpen, onOpenChange, requestLoading }: any) => {
  const [prize, setPrize] = useState<any>()
  const { account } = useContext(Context)
  const { data } = useSubscription(GET_REQUEST_MANAGER, {
    variables: {
      id: requestId,
    },
  })
  useEffect(() => {
    if (data?.request_manager?.[0]?.response?.code == 200) {
      setPrize(data.request_manager[0].response.data)
      setRequestLoading(false)
    }
    if (data?.request_manager?.[0]?.response?.code >= 500) {
      alert(data?.request_manager?.[0]?.response?.error?.msg?.[0]?.message || 'Something went wrong. Please try again.')
      setRequestLoading(false)
    }
  }, [data?.request_manager?.[0]?.response?.code])
  return (
    <GiftModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={requestLoading}
      confettiPriority={
        prize?.nftPrize?.token_type == 'RED' ? 1 : prize?.nftPrize?.token_type == 'GOLD' ? 2 : prize?.nftPrize?.token_type == 'BLUE' ? 3 : 0
      }>
      <div className='flex flex-col items-center text-center'>
        <div className={`${Bangkok.className} text-[#8E0B09] text-sm`}>Congratulations!</div>
        <div className='text-[#4E8E48] font-medium leading-6 mt-[6px]'>{account?.username}</div>
        <div className='mt-[6px] text-sm leading-5 text-center'>
          You have received a prize.
          <br /> Don’t forget to claim it in inventory
        </div>
        {prize?.nftPrize?.token_type == 'RED' ? (
          <>
            <Image src={RedGem} alt='' className='mt-4 w-[72px]' />
            <div className='text-[#000] font-bold text-sm mt-[8px]'>Red Gem</div>
          </>
        ) : prize?.nftPrize?.token_type == 'GOLD' ? (
          <>
            <Image src={GoldGem} alt='' className='mt-4 w-[72px]' />
            <div className='text-[#000] font-bold text-sm mt-[8px]'>Gold Gem</div>
          </>
        ) : prize?.nftPrize?.token_type == 'BLUE' ? (
          <>
            <Image src={BlueGem} alt='' className='mt-4 w-[72px]' />
            <div className='text-[#000] font-bold text-sm mt-[8px]'>Blue Gem</div>
          </>
        ) : (
          <>
            <Image src={WhiteGem} alt='' className='mt-4 w-[72px]' />
            <div className='text-[#000] font-bold text-sm mt-[8px]'>White Gem</div>
          </>
        )}

        {!!prize?.auraPrize && (
          <div className='text-[#4E8E48] mt-4 text-xl leading-6 font-bold'>{`+ ${formatNumber(
            fromMicro(prize?.auraPrize, 6)
          )} AURA`}</div>
        )}
      </div>
    </GiftModal>
  )
}
