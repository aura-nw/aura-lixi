import { Modal as NextModal, ModalContent } from '@nextui-org/react'
import { ReactNode } from 'react'
export default function Modal({
  isOpen,
  onOpenChange,
  children,
}: {
  isOpen: boolean
  onOpenChange: any
  children: ReactNode
}) {
  return (
    <NextModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      classNames={{
        backdrop: 'bg-[#000]/85',
        base: 'bg-[#FFF8D5] rounded-[6px] p-6 text-[#000] mx-4 min-w-[425px] w-fit',
        closeButton: 'hidden',
      }}>
      <ModalContent>{children}</ModalContent>
    </NextModal>
  )
}
