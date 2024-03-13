import { MouseEventHandler, ReactNode } from 'react'

export default function FilledButton({ children, onClick, className }: { children: ReactNode, onClick?: MouseEventHandler<HTMLButtonElement>, className?: string }) {
  return (
    <button onClick={onClick} className={`bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] rounded-2xl py-[10px] px-10 text-[#6D3A0A] font-medium ${className}`}>
      {children}
    </button>
  )
}
