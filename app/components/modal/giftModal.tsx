import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { ReactNode, useEffect } from 'react'
import Nap from '@/assets/nap.svg'
import Duoi from '@/assets/duoi.svg'
import Image from 'next/image'
import confetti from 'canvas-confetti'
export default function GiftModal({
  isOpen,
  onOpenChange,
  children,
}: {
  isOpen: boolean
  onOpenChange: any
  children: ReactNode
}) {
  useEffect(() => {
    if (isOpen) {
      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { y: 0.6 },
      // })
      let end = Date.now() + 500

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
  }, [isOpen])
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      classNames={{
        backdrop: 'bg-[#000]/85',
        base: 'bg-[transparent]',
        closeButton: 'hidden',
      }}>
      <ModalContent>
        <div className='relative flex flex-col items-center'>
          <Image src={Nap} alt='' />
          <div className='bg-[#FEF7D0] p-8 text-[#000] -mb-28 w-[269px] flex flex-col items-center'>{children}</div>
          <Image src={Duoi} alt='' />
        </div>
      </ModalContent>
    </Modal>
  )
}
