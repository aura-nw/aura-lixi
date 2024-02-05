import { Modal as NextModal, ModalContent, CircularProgress } from '@nextui-org/react'
import { ReactNode } from 'react'
import LoadingImage from '@/assets/loading-ball.svg'
import Image from 'next/image'
export default function Modal({
  isOpen,
  onOpenChange,
  children,
  isLoading,
}: {
  isOpen: boolean
  onOpenChange: any
  children: ReactNode
  isLoading?: boolean
}) {
  return (
    <NextModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      classNames={{
        backdrop: 'bg-[#000]/85',
        base: `${
          isLoading ? 'bg-[transparent]' : 'bg-[#FFF8D5]'
        } rounded-[6px] p-6 text-[#000] mx-4 sm:min-w-[425px] w-[90vw] sm:max-w-none max-w-[425px] sm:w-fit`,
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
              label='Loading...'
            />
          </div>
        ) : (
          children
        )}
      </ModalContent>
    </NextModal>
  )
}
