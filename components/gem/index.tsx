import White1 from '@/assets/gem/ngoc trang 1.png'
import White2 from '@/assets/gem/ngoc trang 2.png'
import White3 from '@/assets/gem/ngoc trang 3.png'
import White4 from '@/assets/gem/ngoc trang 4.png'
import White5 from '@/assets/gem/ngoc trang 5.png'
import White6 from '@/assets/gem/ngoc trang 6.png'
import White7 from '@/assets/gem/ngoc trang 7.png'
import Blue1 from '@/assets/gem/ngoc xanh 1.png'
import Blue2 from '@/assets/gem/ngoc xanh 2.png'
import Blue3 from '@/assets/gem/ngoc xanh 3.png'
import Blue4 from '@/assets/gem/ngoc xanh 4.png'
import Blue5 from '@/assets/gem/ngoc xanh 5.png'
import Blue6 from '@/assets/gem/ngoc xanh 6.png'
import Blue7 from '@/assets/gem/ngoc xanh 7.png'
import Gold1 from '@/assets/gem/ngoc vang1.png'
import Gold2 from '@/assets/gem/ngoc vang 2.png'
import Gold3 from '@/assets/gem/ngoc vang 3.png'
import Gold4 from '@/assets/gem/ngoc vang 4.png'
import Gold5 from '@/assets/gem/ngoc vang 5.png'
import Gold6 from '@/assets/gem/ngoc vang 6.png'
import Gold7 from '@/assets/gem/ngoc vang 7.png'
import Red1 from '@/assets/gem/ngoc do 1.png'
import Red2 from '@/assets/gem/ngoc do 2.png'
import Red3 from '@/assets/gem/ngoc do 3.png'
import Red4 from '@/assets/gem/ngoc do 4.png'
import Red5 from '@/assets/gem/ngoc do 5.png'
import Red6 from '@/assets/gem/ngoc do 6.png'
import Red7 from '@/assets/gem/ngoc do 7.png'
import SRed1 from '@/assets/gem/Sieu Nhan Do.png'
import SGold1 from '@/assets/gem/Sieu Nhan Vang.png'
import SBlue1 from '@/assets/gem/Sieu Nhan Xanh.png'
import SWhite1 from '@/assets/gem/Sieu Nhan Trang.png'
import Image from 'next/image'
export default function Gem({ className, type }: { className?: string; type: string }) {
  switch (type[0]) {
    case 's':
      switch (type[1]) {
        case 'w':
          return (
            <>
              {(function () {
                switch (type[2]) {
                  case '1':
                    return <Image src={SWhite1} alt='' className={`w-14 h-14 ${className}`} />
                  default:
                    return <></>
                }
              })()}
            </>
          )
        case 'b':
          return (
            <>
              {(function () {
                switch (type[2]) {
                  case '1':
                    return <Image src={SBlue1} alt='' className={`w-14 h-14 ${className}`} />
                  default:
                    return <></>
                }
              })()}
            </>
          )
        case 'g':
          return (
            <>
              {(function () {
                switch (type[2]) {
                  case '1':
                    return <Image src={SGold1} alt='' className={`w-14 h-14 ${className}`} />
                  default:
                    return <></>
                }
              })()}
            </>
          )
        case 'r':
          return (
            <>
              {(function () {
                switch (type[2]) {
                  case '1':
                    return <Image src={SRed1} alt='' className={`w-14 h-14 ${className}`} />
                  default:
                    return <></>
                }
              })()}
            </>
          )

        default:
          return <></>
      }
    case 'w':
      return (
        <>
          {(function () {
            switch (type[1]) {
              case '1':
                return <Image src={White1} alt='' className={`w-10 h-10 ${className}`} />
              case '2':
                return <Image src={White2} alt='' className={`w-10 h-10 ${className}`} />
              case '3':
                return <Image src={White3} alt='' className={`w-10 h-10 ${className}`} />
              case '4':
                return <Image src={White4} alt='' className={`w-10 h-10 ${className}`} />
              case '5':
                return <Image src={White5} alt='' className={`w-10 h-10 ${className}`} />
              case '6':
                return <Image src={White6} alt='' className={`w-10 h-10 ${className}`} />
              case '7':
                return <Image src={White7} alt='' className={`w-10 h-10 ${className}`} />
              default:
                return <></>
            }
          })()}
        </>
      )
    case 'b':
      return (
        <>
          {(function () {
            switch (type[1]) {
              case '1':
                return <Image src={Blue1} alt='' className={`w-10 h-10 ${className}`} />
              case '2':
                return <Image src={Blue2} alt='' className={`w-10 h-10 ${className}`} />
              case '3':
                return <Image src={Blue3} alt='' className={`w-10 h-10 ${className}`} />
              case '4':
                return <Image src={Blue4} alt='' className={`w-10 h-10 ${className}`} />
              case '5':
                return <Image src={Blue5} alt='' className={`w-10 h-10 ${className}`} />
              case '6':
                return <Image src={Blue6} alt='' className={`w-10 h-10 ${className}`} />
              case '7':
                return <Image src={Blue7} alt='' className={`w-10 h-10 ${className}`} />
              default:
                return <></>
            }
          })()}
        </>
      )
    case 'g':
      return (
        <>
          {(function () {
            switch (type[1]) {
              case '1':
                return <Image src={Gold1} alt='' className={`w-10 h-10 ${className}`} />
              case '2':
                return <Image src={Gold2} alt='' className={`w-10 h-10 ${className}`} />
              case '3':
                return <Image src={Gold3} alt='' className={`w-10 h-10 ${className}`} />
              case '4':
                return <Image src={Gold4} alt='' className={`w-10 h-10 ${className}`} />
              case '5':
                return <Image src={Gold5} alt='' className={`w-10 h-10 ${className}`} />
              case '6':
                return <Image src={Gold6} alt='' className={`w-10 h-10 ${className}`} />
              case '7':
                return <Image src={Gold7} alt='' className={`w-10 h-10 ${className}`} />
              default:
                return <></>
            }
          })()}
        </>
      )
    case 'r':
      return (
        <>
          {(function () {
            switch (type[1]) {
              case '1':
                return <Image src={Red1} alt='' className={`w-10 h-10 ${className}`} />
              case '2':
                return <Image src={Red2} alt='' className={`w-10 h-10 ${className}`} />
              case '3':
                return <Image src={Red3} alt='' className={`w-10 h-10 ${className}`} />
              case '4':
                return <Image src={Red4} alt='' className={`w-10 h-10 ${className}`} />
              case '5':
                return <Image src={Red5} alt='' className={`w-10 h-10 ${className}`} />
              case '6':
                return <Image src={Red6} alt='' className={`w-10 h-10 ${className}`} />
              case '7':
                return <Image src={Red7} alt='' className={`w-10 h-10 ${className}`} />
              default:
                return <></>
            }
          })()}
        </>
      )
  }
}
