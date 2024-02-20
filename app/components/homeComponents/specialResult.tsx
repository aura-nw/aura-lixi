'use client'
import BlueGemPrize from '@/assets/blue-gem.png'
import BlueGem from '@/assets/blue-gem.svg'
import GoldGemPrize from '@/assets/gold-gem.png'
import GoldGem from '@/assets/gold-gem.svg'
import BgMobile from '@/assets/prize_mobile.png'
import Bg from '@/assets/prize_p.png'
import RedGemPrize from '@/assets/red-gem.png'
import RedGem from '@/assets/red-gem.svg'
import WhiteGemPrize from '@/assets/white-gem.png'
import WhiteGem from '@/assets/white-gem.svg'
import { Bangkok, Context, Mori } from '@/context'
import { GET_REQUEST_MANAGER } from '@/services'
import { formatNumber, fromMicro } from '@/utils'
import { getItem, setItem } from '@/utils/localStorage'
import { useSubscription } from '@apollo/client'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import GiftModal from '../modal/giftModal'
export const SpecialResult = ({ requestId }: { requestId: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [prize, setPrize] = useState<any>()
  const { account } = useContext(Context)
  const [requestLoading, setRequestLoading] = useState(true)
  const { data } = useSubscription(GET_REQUEST_MANAGER, {
    variables: {
      id: requestId,
    },
  })
  useEffect(() => {
    if (data?.request_manager?.[0]?.response?.code == 200) {
      setPrize(data.request_manager[0].response.data)
      setRequestLoading(false)
      onOpen()
      setItem('request_id', requestId.toString())
    }
  }, [data?.request_manager?.[0]?.response?.code])

  useEffect(() => {
    const confettiPriority =
      prize?.auraPrize != undefined && prize?.auraPrize != 0
        ? 4
        : prize?.nftPrize?.token_type == 'RED'
        ? 3
        : prize?.nftPrize?.token_type == 'GOLD'
        ? 2
        : prize?.nftPrize?.token_type == 'BLUE'
        ? 1
        : 0
    if (requestLoading) return
    if (confettiPriority == 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1da3fd'],
      })
    }
    if (confettiPriority == 2) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd966', '#ffe599', '#f1c232', '#e69138'],
      })
    }
    if (confettiPriority == 3) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#cc0000', '#FF697B'],
      })
    }
    if (confettiPriority == 4) {
      var aura = confetti.shapeFromPath({
        path: 'M59.8505 40.7488C59.4047 40.4959 58.9636 40.229 58.5321 39.9621C54.6953 37.5601 54.6953 32.0114 58.5321 29.614C58.9636 29.3424 59.4047 29.0802 59.8505 28.8274C64.024 26.4487 65.4562 21.1763 63.047 17.0558C60.6378 12.9353 55.2976 11.5212 51.1241 13.8999C50.9107 14.0216 50.6925 14.1433 50.4744 14.2604C46.3531 16.5033 41.2358 13.633 41.2263 8.99269V8.90372C41.2263 4.14639 37.3184 0.288086 32.5 0.288086C27.6815 0.288086 23.7736 4.14639 23.7736 8.90372C23.7736 8.93182 23.7736 8.96459 23.7736 8.99269C23.7641 13.6376 18.6469 16.5033 14.5255 14.2604C14.3074 14.1433 14.094 14.0216 13.8758 13.8999C9.70233 11.5212 4.36217 12.9306 1.95294 17.0558C-0.4563 21.1763 0.97122 26.4487 5.14944 28.8274C5.59525 29.0802 6.03631 29.3471 6.46788 29.614C10.3046 32.0161 10.3046 37.5648 6.46788 39.9621C6.03631 40.2337 5.59525 40.4959 5.14944 40.7488C0.975963 43.1275 -0.4563 48.3952 1.95294 52.5204C4.36217 56.6456 9.70233 58.055 13.8758 55.6763C14.0892 55.5546 14.3074 55.4328 14.5255 55.3158C18.6469 53.0729 23.7641 55.9432 23.7736 60.5835C23.7736 60.6116 23.7736 60.6444 23.7736 60.6725C23.7736 65.4298 27.6815 69.2881 32.5 69.2881C37.3184 69.2881 41.2263 65.4298 41.2263 60.6725V60.5835C41.2358 55.9385 46.3531 53.0729 50.4744 55.3111C50.6925 55.4281 50.906 55.5499 51.1241 55.6716C55.2976 58.0503 60.6378 56.6409 63.047 52.5157C65.4562 48.3952 64.0287 43.1228 59.8505 40.7441V40.7488ZM59.3478 50.4133C58.5558 51.7712 57.0713 52.614 55.4778 52.614C54.7048 52.614 53.9365 52.408 53.2583 52.024C46.9554 48.4326 39.7798 46.5316 32.5 46.5316C25.2201 46.5316 18.0445 48.4326 11.7416 52.024C11.054 52.4174 10.3046 52.614 9.52211 52.614C7.9286 52.614 6.44891 51.7712 5.65216 50.4133C4.42383 48.3109 5.15419 45.6138 7.28361 44.4011C20.0886 37.1012 28.0419 23.4988 28.0419 8.90372C28.0419 6.47823 30.0433 4.50226 32.5 4.50226C34.9566 4.50226 36.958 6.47823 36.958 8.90372C36.958 23.4988 44.9113 37.1012 57.7163 44.4011C58.7455 44.9911 59.4853 45.9369 59.7936 47.0747C60.1018 48.2126 59.9453 49.3972 59.3478 50.4133Z',
      })
      let end = Date.now() + 500

      ;(function frame() {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },

          shapes: [aura],
          colors: ['#FFD569', '#FF697B'],
        })
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },

          shapes: [aura],
          colors: ['#FFD569', '#FF697B'],
        })

        var defaults = {
          scalar: 2,
          spread: 180,
          particleCount: 7,
          origin: { y: -0.1 },
          startVelocity: -35,
        }

        confetti({
          ...defaults,
          shapes: [aura],
          colors: ['#FFD569', '#FF697B'],
        })
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  }, [prize?.auraPrize, requestLoading])

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
            You have received a prize by following us on X.
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
          closeButton: 'z-10',
        }}>
        <ModalContent>
          <div className='relative'>
            <Image src={BgMobile} alt='' className='w-[370px] lg:hidden' />
            <Image src={Bg} alt='' className='w-[910px] lg:block hidden' />
            <div
              className={`absolute inset-x-3 top-[9.1rem] lg:left-[4.7rem] lg:right-[4.4rem] lg:top-[8.9rem] lg:flex-row flex-col flex items-center justify-between text-[#fff] ${Mori.className}`}>
              <div className='text-center lg:text-start'>
                <div className='bg-[linear-gradient(326.39deg,#EDBA37_1.66%,#E8793A_50.91%,#F64C60_97.28%)] inline-block text-[transparent] bg-clip-text font-semibold text-2xl lg:text-[40px] lg:leading-[44px]'>
                  Congratulation!
                </div>
                <div className='lg:text-[28px] text-lg lg:leading-8'>{account?.username}</div>
                <div className='mt-6 text-4xl lg:text-[66px] font-[100] lg:leading-[74px]'>
                  <span className='font-semibold'>{formatNumber(fromMicro(prize?.auraPrize, 6))}</span> $AURA
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
