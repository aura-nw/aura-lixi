import { CircularProgress, Modal, ModalContent } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { ReactNode, useEffect } from 'react'
export default function NoBackgroundModal({
  isOpen,
  onOpenChange,
  children,
  isLoading,
  confettiPriority,
  cta,
}: {
  isOpen: boolean
  isLoading?: boolean
  onOpenChange: any
  children: ReactNode
  cta?: ReactNode
  confettiPriority?: number
}) {
  useEffect(() => {
    if (isOpen && !isLoading && confettiPriority) {
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
    }
  }, [isOpen, isLoading, confettiPriority])
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(any) => (isLoading ? null : onOpenChange(any))}
      placement='center'
      classNames={{
        backdrop: 'bg-[#000]/85',
        base: 'bg-[transparent] max-w-2xl',
        closeButton: 'hidden',
      }}>
      <ModalContent>
        {isLoading ? (
          <div className='flex justify-center'>
            <CircularProgress
              classNames={{
                label: 'text-[#FFF8D5]',
                indicator: 'stroke-[#8E0B09]',
              }}
              size='lg'
              label='Processing...'
            />
          </div>
        ) : (
          <div className='flex justify-center'>{children}</div>
        )}
      </ModalContent>
    </Modal>
  )
}
