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
export default function GemWithFrame({
  className,
  type,
}: {
  className?: string
  type:
    | 'w1'
    | 'w2'
    | 'w3'
    | 'w4'
    | 'w5'
    | 'w6'
    | 'w7'
    | 'sw'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'b6'
    | 'b7'
    | 'sb'
    | 'g1'
    | 'g2'
    | 'g3'
    | 'g4'
    | 'g5'
    | 'g6'
    | 'g7'
    | 'sg'
    | 'r1'
    | 'r2'
    | 'r3'
    | 'r4'
    | 'r5'
    | 'r6'
    | 'r7'
    | 'sr'
}) {
  switch (type[0]) {
    case 's':
      switch (type[1]) {
        case 'w':
          return (
            <div
              className={`bg-gradient-to-b from-[#CECECE] via-[#FFFFFF] to-[#B0B0B0] rounded-md w-[60px] h-[60px] p-[3px]`}>
              <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#6E6E6E63_0.07%,#11111163_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
                <Image src={SWhite1} alt='' className='w-14 h-14' />
              </div>
            </div>
          )
        case 'b':
          return (
            <div className={`bg-gradient-to-b from-[#AFD4FF] to-[#00B8C4] rounded-md w-[60px] h-[60px] p-[3px]`}>
              <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#90E4FF_0.07%,#006576_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
                <Image src={SBlue1} alt='' className='w-14 h-14' />
              </div>
            </div>
          )
        case 'g':
          return (
            <div
              className={`bg-gradient-to-b from-[#ECAB2C] via-[#FFEFC0] to-[#ECAB2C] rounded-md w-[60px] h-[60px] p-[3px]`}>
              <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#FBE1AF_0.07%,#956233_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
                <Image src={SGold1} alt='' className='w-14 h-14' />
              </div>
            </div>
          )
        case 'r':
          return (
            <div
              className={`bg-gradient-to-b from-[#952D33] via-[#FFB6D5] to-[#992229] rounded-md w-[60px] h-[60px] p-[3px]`}>
              <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#ED8183_0.07%,#663435_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
                <Image src={SRed1} alt='' className='w-14 h-14' />
              </div>
            </div>
          )

        default:
          return <></>
      }
    case 'w':
      return (
        <div
          className={`bg-gradient-to-b from-[#CECECE] via-[#FFFFFF] to-[#B0B0B0] rounded-md w-[60px] h-[60px] p-[3px]`}>
          <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#6E6E6E63_0.07%,#11111163_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
            {(function () {
              switch (type[1]) {
                case '1':
                  return <Image src={White1} alt='' className='w-10 h-10' />
                case '2':
                  return <Image src={White2} alt='' className='w-10 h-10' />
                case '3':
                  return <Image src={White3} alt='' className='w-10 h-10' />
                case '4':
                  return <Image src={White4} alt='' className='w-10 h-10' />
                case '5':
                  return <Image src={White5} alt='' className='w-10 h-10' />
                case '6':
                  return <Image src={White6} alt='' className='w-10 h-10' />
                case '7':
                  return <Image src={White7} alt='' className='w-10 h-10' />
                default:
                  return <></>
              }
            })()}
          </div>
        </div>
      )
    case 'b':
      return (
        <div className={`bg-gradient-to-b from-[#AFD4FF] to-[#00B8C4] rounded-md w-[60px] h-[60px] p-[3px]`}>
          <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#90E4FF_0.07%,#006576_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
            {(function () {
              switch (type[1]) {
                case '1':
                  return <Image src={Blue1} alt='' className='w-10 h-10' />
                case '2':
                  return <Image src={Blue2} alt='' className='w-10 h-10' />
                case '3':
                  return <Image src={Blue3} alt='' className='w-10 h-10' />
                case '4':
                  return <Image src={Blue4} alt='' className='w-10 h-10' />
                case '5':
                  return <Image src={Blue5} alt='' className='w-10 h-10' />
                case '6':
                  return <Image src={Blue6} alt='' className='w-10 h-10' />
                case '7':
                  return <Image src={Blue7} alt='' className='w-10 h-10' />
                default:
                  return <></>
              }
            })()}
          </div>
        </div>
      )
    case 'g':
      return (
        <div
          className={`bg-gradient-to-b from-[#ECAB2C] via-[#FFEFC0] to-[#ECAB2C] rounded-md w-[60px] h-[60px] p-[3px]`}>
          <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#FBE1AF_0.07%,#956233_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
            {(function () {
              switch (type[1]) {
                case '1':
                  return <Image src={Gold1} alt='' className='w-10 h-10' />
                case '2':
                  return <Image src={Gold2} alt='' className='w-10 h-10' />
                case '3':
                  return <Image src={Gold3} alt='' className='w-10 h-10' />
                case '4':
                  return <Image src={Gold4} alt='' className='w-10 h-10' />
                case '5':
                  return <Image src={Gold5} alt='' className='w-10 h-10' />
                case '6':
                  return <Image src={Gold6} alt='' className='w-10 h-10' />
                case '7':
                  return <Image src={Gold7} alt='' className='w-10 h-10' />
                default:
                  return <></>
              }
            })()}
          </div>
        </div>
      )
    case 'r':
      return (
        <div
          className={`bg-gradient-to-b from-[#952D33] via-[#FFB6D5] to-[#992229] rounded-md w-[60px] h-[60px] p-[3px]`}>
          <div className='bg-[radial-gradient(50%_50%_at_50%_50%,#ED8183_0.07%,#663435_100%)] w-full h-full grid place-items-center rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)_inset,0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]'>
            {(function () {
              switch (type[1]) {
                case '1':
                  return <Image src={Red1} alt='' className='w-10 h-10' />
                case '2':
                  return <Image src={Red2} alt='' className='w-10 h-10' />
                case '3':
                  return <Image src={Red3} alt='' className='w-10 h-10' />
                case '4':
                  return <Image src={Red4} alt='' className='w-10 h-10' />
                case '5':
                  return <Image src={Red5} alt='' className='w-10 h-10' />
                case '6':
                  return <Image src={Red6} alt='' className='w-10 h-10' />
                case '7':
                  return <Image src={Red7} alt='' className='w-10 h-10' />
                default:
                  return <></>
              }
            })()}
          </div>
        </div>
      )
  }
}
