import { MouseEventHandler } from 'react'

export default function Checkbox({
  onClick,
  checked,
  className,
}: {
  checked?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}) {
  return (
    <div onClick={onClick} className={`relative cursor-pointer ${className}`}>
      <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' fill='none'>
        <g filter='url(#filter0_ii_1685_7465)'>
          <rect width='21' height='21' rx='4' fill='black' fillOpacity='0.39' />
        </g>
        <defs>
          <filter
            id='filter0_ii_1685_7465'
            x='0'
            y='0'
            width='21'
            height='25'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow_1685_7465' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='1' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='effect1_innerShadow_1685_7465' result='effect2_innerShadow_1685_7465' />
          </filter>
        </defs>
      </svg>
      {checked && (
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' className='absolute inset-[2px]'>
          <path
            d='M13.3332 4L5.99984 11.3333L2.6665 8'
            stroke='#A0FF04'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </div>
  )
}
