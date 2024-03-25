import { CircularProgress } from '@nextui-org/react'
import { MouseEventHandler, ReactNode } from 'react'

export default function FilledButton({
  children,
  onClick,
  className,
  href,
  target,
  disabled,
  isLoading,
}: {
  href?: string
  target?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  isLoading?: boolean
}) {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={` rounded-2xl py-[10px] px-10 ${
          disabled
            ? 'text-[#707070] bg-[linear-gradient(180deg,#F2EEE7_0%,#AFA69B_100%)]'
            : 'text-[#6D3A0A] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)]'
        } font-medium ${className}`}>
        {isLoading ? (
          <CircularProgress
            classNames={{
              label: 'text-[#FFF8D5]',
              indicator: 'stroke-[#8E0B09]',
              base: '-my-1',
            }}
            size='sm'
          />
        ) : (
          children
        )}
      </a>
    )
  }
  return (
    <button
      onClick={!disabled && !isLoading ? onClick : undefined}
      className={` rounded-2xl py-[10px] px-10 ${
        disabled
          ? 'text-[#707070] bg-[linear-gradient(180deg,#F2EEE7_0%,#AFA69B_100%)]'
          : 'text-[#6D3A0A] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)]'
      } font-medium ${className}`}>
      {isLoading ? (
        <CircularProgress
          classNames={{
            label: 'text-[#FFF8D5]',
            indicator: 'stroke-[#8E0B09]',
            base: '-my-1',
          }}
          size='sm'
        />
      ) : (
        children
      )}
    </button>
  )
}
