import { Modal as NextModal, ModalContent } from '@nextui-org/react'
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
        } rounded-[6px] p-6 text-[#000] mx-4 min-w-[425px] max-w-none w-fit`,
        closeButton: 'hidden',
      }}>
      <ModalContent>{isLoading ? <Image src={LoadingImage} alt='' /> : children}</ModalContent>
    </NextModal>
  )
}
