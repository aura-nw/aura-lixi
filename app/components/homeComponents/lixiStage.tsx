'use client'
import BlueGemPrize from '@/assets/blue-gem.png'
import BlueGem from '@/assets/blue-gem.svg'
import BlueLixi from '@/assets/blue-lixi.svg'
import GoldGemPrize from '@/assets/gold-gem.png'
import GoldGem from '@/assets/gold-gem.svg'
import GoldLixi from '@/assets/gold-lixi.svg'
import LixiStageImg from '@/assets/lixi-stage.svg'
import BgMobile from '@/assets/prize_mobile.png'
import Bg from '@/assets/prize_p.png'
import RedGemPrize from '@/assets/red-gem.png'
import RedGem from '@/assets/red-gem.svg'
import RedLixi from '@/assets/red-lixi.svg'
import WhiteGemPrize from '@/assets/white-gem.png'
import WhiteGem from '@/assets/white-gem.svg'
import { Bangkok, Context, Go3, Mori } from '@/context'
import { SubcriptionContext } from '@/context/subcriptionContext'
import { GET_REQUEST_MANAGER, openLixi } from '@/services'
import { formatNumber, fromMicro } from '@/utils'
import { useSubscription } from '@apollo/client'
import { CircularProgress, Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import GiftModal from '../modal/giftModal'
export default function LixiStage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const {
    lixiData: { data, loading },
  } = useContext(SubcriptionContext)
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestId, setRequestId] = useState(undefined)
  const [processing, setProcessing] = useState(false)
  const openHandler = async () => {
    try {
      if (processing) return
      setProcessing(true)
      const res = await openLixi(data.lixi[0].id)
      setProcessing(false)
      if (res?.data?.data?.requestId) {
        setRequestId(res?.data?.data?.requestId)
        setRequestLoading(true)
        onOpen()
      } else {
        alert(`Open Li xi with id ${data.lixi[0].id} failed. Please contact us via Discord or Telegram`)
      }
    } catch (error: any) {
      // alert(error?.message || 'Something went wrong. Please try again')
      setProcessing(false)
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
        {data?.lixi?.[0] ? (
          <Image
            src={data?.lixi?.[0]?.type == 'RED' ? RedLixi : data?.lixi?.[0]?.type == 'GOLD' ? GoldLixi : BlueLixi}
            alt=''
            className='mt-20 relative z-[2] -mb-3 h-[200px]'
          />
        ) : (
          <div className='h-[200px] w-1 mt-20 relative z-[2] -mb-3'></div>
        )}
        <Image src={LixiStageImg} alt='' className='relative z-[1]' />
        <div className='absolute z-[3] top-[19.75rem] flex flex-col items-center'>
          <button
            onClick={openHandler}
            disabled={!data?.lixi?.length}
            className=' text-[#6D3A0A] font-semibold p-[10px] rounded-2xl bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] disabled:text-[#6b6b6b] disabled:bg-[linear-gradient(180deg,#EFEBE4_0%,#B3AAA0_100%)] flex items-center gap-2 h-10 w-[149px] justify-center'>
            {processing ? (
              <CircularProgress
                classNames={{
                  label: 'text-[#FFF8D5]',
                  indicator: 'stroke-[#8E0B09]',
                }}
                size='sm'
              />
            ) : (
              'OPEN'
            )}
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

  useEffect(() => {
    const confettiPriority =
      prize?.nftPrize?.token_type == 'RED' || prize?.auraPrize != 0
        ? 1
        : prize?.nftPrize?.token_type == 'GOLD'
        ? 2
        : prize?.nftPrize?.token_type == 'BLUE'
        ? 3
        : 0

    if (confettiPriority == 3) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
    if (confettiPriority == 2) {
      let defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
      }

      const shoot = () => {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ['star'],
        })

        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ['circle'],
        })
      }

      setTimeout(shoot, 0)
      setTimeout(shoot, 100)
      setTimeout(shoot, 200)
      setTimeout(shoot, 300)
    }
    if (confettiPriority == 1) {
      let end = Date.now() + 1000

      // go Buckeyes!
      let colors = ['#FFD569', '#FF697B']

      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  }, [prize?.auraPrize])

  if (requestLoading) {
    return (
      <GiftModal isOpen={true} onOpenChange={onOpenChange} isLoading>
        <></>
      </GiftModal>
    )
  }
  if (prize?.auraPrize == 0) {
    return (
      <GiftModal isOpen={isOpen} onOpenChange={onOpenChange}>
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
        </div>
      </GiftModal>
    )
  } else {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='center'
        classNames={{
          backdrop: 'bg-[#000]/85',
          base: `bg-[transparent] rounded-[6px] text-[#000] w-fit max-w-none`,
          closeButton: 'hidden',
        }}>
        <ModalContent>
          <div className='relative'>
            <Image src={BgMobile} alt='' className='w-[370px] lg:hidden' />
            <Image src={Bg} alt='' className='w-[910px] lg:block hidden' />
            <div
              className={`absolute inset-x-3 top-[9.4rem] lg:left-[4.7rem] lg:right-[4.4rem] lg:top-[8.9rem] lg:flex-row flex-col flex items-center justify-between text-[#fff] ${Mori.className}`}>
              <div className='text-center lg:text-start'>
                <div className='bg-[linear-gradient(326.39deg,#EDBA37_1.66%,#E8793A_50.91%,#F64C60_97.28%)] inline-block text-[transparent] bg-clip-text font-semibold text-2xl lg:text-[40px] lg:leading-[44px]'>
                  Congratulation!
                </div>
                <div className='lg:text-[28px] text-lg lg:leading-8'>{account?.username}</div>
                <div className='mt-6 text-4xl lg:text-[66px] font-[100] lg:leading-[74px]'>
                  <span className='font-semibold'>${formatNumber(fromMicro(prize?.auraPrize, 6))}</span> $AURA
                </div>
                <div className='lg:text-2xl'>
                  {prize?.nftPrize?.token_type == 'RED' ? (
                    <>+ Red Gem</>
                  ) : prize?.nftPrize?.token_type == 'GOLD' ? (
                    <>+ Gold Gem</>
                  ) : prize?.nftPrize?.token_type == 'BLUE' ? (
                    <>+ Blue Gem</>
                  ) : (
                    <>+ White Gem</>
                  )}
                </div>
              </div>
              <div className='mt-5 lg:mt-0'>
                {prize?.nftPrize?.token_type == 'RED' ? (
                  <>
                    <Image src={RedGemPrize} alt='' className='lg:h-[242px] lg:w-[242px] h-[162px] w-[162px]' />
                  </>
                ) : prize?.nftPrize?.token_type == 'GOLD' ? (
                  <>
                    <Image src={GoldGemPrize} alt='' className='lg:h-[242px] lg:w-[242px] h-[162px] w-[162px]' />
                  </>
                ) : prize?.nftPrize?.token_type == 'BLUE' ? (
                  <>
                    <Image src={BlueGemPrize} alt='' className='lg:h-[242px] lg:w-[242px] h-[162px] w-[162px]' />
                  </>
                ) : (
                  <>
                    <Image src={WhiteGemPrize} alt='' className='lg:h-[242px] lg:w-[242px] h-[162px] w-[162px]' />
                  </>
                )}
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    )
  }
}
