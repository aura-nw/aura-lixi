import { Bangkok, Context } from '@/context'
import { fetchHistory } from '@/services'
import { useDisclosure } from '@nextui-org/react'
import moment from 'moment'
import { useContext } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import useSWR from 'swr'
import Modal from '../modal'
import { toast } from 'react-toastify'
export default function FortuneNumberSection() {
  const { account } = useContext(Context)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSWR('fetchHistory', fetchHistory, {
    refreshInterval: 120000,
  })
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div
          className={`text-2xl leading-[30px] tracking-[0.24px] text-[#8E0B09] w-full text-center ${Bangkok.className} mb-4`}>
          History
        </div>
        <div className='flex flex-col gap-2 sm:w-[482px]'>
          <div className='items-center text-[#000] text-sm leading-6 font-medium pr-6 hidden sm:flex'>
            <div className='w-[138px]'>Code</div>
            <div className='flex-1'>Used by</div>
            <div className=''>Time</div>
          </div>
          <div
            className={`w-full [&>div:nth-child(odd)]:bg-[#F5E3BC] [&>div:nth-child(even)]:bg-[transparent] max-h-[222px] overflow-auto custom-scrollbar ${
              data?.length > 7 ? 'pr-4' : ''
            }`}>
            {data?.map((row: any, index: number) => (
              <div key={index} className='sm:flex p-1 rounded-md text-sm items-center'>
                <div className='text-[#292929] text-sm leading-6 w-[138px] font-medium'>{row.code}</div>
                <div className='text-[#B93139] flex-1'>
                  <span className='text-[#707070] w-14 inline-block sm:hidden'>Used by</span>
                  {row?.referee?.username}
                </div>
                <div className='text-[#B93139]'>
                  <span className='text-[#707070] w-14 inline-block sm:hidden'>Time</span>
                  {moment(row.created_at).format('DD/MM/yyyy HH:mm')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <section className='relative w-[343px] md:w-[260px] mt-4 mx-auto rounded-md border-[0.5px] border-[#FFD66B] bg-[linear-gradient(180deg,#FDF5CB_0%,#FDF5CB_0.01%,#FFF9DB_100%)] py-4 px-6 flex flex-col gap-4'>
        <div className='absolute inset-x-[15px] -top-[23px] flex justify-between'>
          <div className='rounded-[3px] bg-[linear-gradient(98deg,#FA7519_-2.01%,#FFCB7E_109.77%)] w-2 h-7'></div>
          <div className='rounded-[3px] bg-[linear-gradient(98deg,#FA7519_-2.01%,#FFCB7E_109.77%)] w-2 h-7'></div>
        </div>
        <div
          className={`text-2xl leading-[30px] tracking-[0.24px] text-[#8E0B09] w-full text-center ${Bangkok.className} whitespace-nowrap`}>
          Fortune numbers
        </div>
        <div className='flex justify-between'>
          <span className='text-[#C66722] text-sm leading-6 font-medium cursor-pointer'></span>
          <button
            onClick={() => {
              onOpen()
            }}
            className='p-[6px] rounded-[10px] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] flex items-center gap-[2px] h-6 text-[9px] justify-center'>
            <span className='font-medium text-[#6D3A0A] whitespace-nowrap'>History</span>
            <span className='p-[3px]'>
              <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path d='M5.12512 3V5L6.37512 6.25' stroke='#6D3A0A' strokeLinecap='round' strokeLinejoin='round' />
                <path
                  d='M1.29411 2.43557L0.91911 2.43707C0.919504 2.53592 0.958912 2.63061 1.02876 2.70056C1.09862 2.7705 1.19326 2.81004 1.29211 2.81057L1.29411 2.43557ZM2.56511 2.81657C2.61436 2.8168 2.66316 2.80732 2.70875 2.78869C2.75433 2.77006 2.7958 2.74263 2.83079 2.70797C2.86577 2.67331 2.89359 2.6321 2.91264 2.58669C2.9317 2.54128 2.94163 2.49256 2.94186 2.44332C2.94209 2.39407 2.93262 2.34526 2.91398 2.29968C2.89535 2.25409 2.86792 2.21262 2.83326 2.17764C2.7986 2.14265 2.75739 2.11484 2.71198 2.09578C2.66657 2.07672 2.61786 2.0668 2.56861 2.06657L2.56511 2.81657ZM1.66261 1.16057C1.66235 1.11132 1.65239 1.06261 1.6333 1.01721C1.61421 0.971816 1.58637 0.930624 1.55136 0.895987C1.51635 0.861351 1.47487 0.833949 1.42927 0.815346C1.38367 0.796744 1.33486 0.787304 1.28561 0.787567C1.23636 0.787829 1.18765 0.797789 1.14226 0.816877C1.09686 0.835965 1.05567 0.863808 1.02103 0.898816C0.986394 0.933823 0.958992 0.97531 0.940389 1.02091C0.921787 1.06651 0.912347 1.11532 0.91261 1.16457L1.66261 1.16057ZM1.03861 4.39257C1.04579 4.34356 1.0432 4.29361 1.03097 4.24561C1.01875 4.19761 0.99713 4.1525 0.967374 4.1129C0.937618 4.0733 0.900311 4.03999 0.857608 4.01489C0.814905 3.98978 0.767652 3.97339 0.718578 3.96666C0.669504 3.95992 0.619582 3.96297 0.571694 3.97564C0.523806 3.9883 0.478902 4.01033 0.439575 4.04044C0.400249 4.07056 0.367278 4.10817 0.342568 4.1511C0.317858 4.19403 0.301898 4.24143 0.29561 4.29057L1.03861 4.39257ZM8.55611 1.56907C6.64611 -0.340933 3.55961 -0.360933 1.66211 1.53707L2.19211 2.06707C3.79211 0.467567 6.40361 0.477067 8.02611 2.09907L8.55611 1.56907ZM1.69411 8.43107C3.60411 10.3411 6.69061 10.3611 8.58811 8.46307L8.05811 7.93307C6.45811 9.53257 3.84661 9.52307 2.22411 7.90107L1.69411 8.43107ZM8.58811 8.46307C10.4856 6.56557 10.4661 3.47907 8.55611 1.56907L8.02611 2.09907C9.64811 3.72157 9.65761 6.33307 8.05811 7.93307L8.58811 8.46307ZM1.66211 1.53707L1.02861 2.17007L1.55911 2.70007L2.19211 2.06707L1.66211 1.53707ZM1.29211 2.81057L2.56511 2.81657L2.56861 2.06657L1.29611 2.06057L1.29211 2.81057ZM1.66911 2.43357L1.66261 1.16057L0.91261 1.16457L0.91911 2.43707L1.66911 2.43357ZM0.29511 4.29007C0.19238 5.04136 0.265199 5.80623 0.507849 6.52464C0.7505 7.24305 1.15638 7.89543 1.69361 8.43057L2.22361 7.90057C1.76822 7.44721 1.42416 6.89443 1.21846 6.28566C1.01276 5.6769 0.95103 5.02872 1.03811 4.39207L0.29511 4.29007Z'
                  fill='#6D3A0A'
                />
              </svg>
            </span>
          </button>
        </div>
        <div className='flex flex-col gap-2 h-[152px] overflow-auto pr-2 justify-center items-center'>
          <div className='text-[#C66722] text-sm text-center'>The Dragon takes all your Fortune numbers far away.</div>
        </div>
        <div className='text-[#C66722] text-sm h-[54px]  '></div>
      </section>
    </>
  )
}
const RefCode = ({ refCode }: { refCode: { code: string; isUsed: boolean } }) => {
  if (refCode.isUsed) {
    return (
      <div key={refCode.code} className='flex gap-2 items-center'>
        <svg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'>
          <rect y='7' width='9' height='9' rx='2' transform='rotate(-45 0 7)' fill='#F0C865' />
        </svg>
        <div className='truncate w-full text-sm leading-6 font-medium text-[#9D9D9D]'>{refCode.code}</div>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M13.3333 4L5.99996 11.3333L2.66663 8'
            stroke='#3D9E1B'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    )
  }
  return (
    <div key={refCode.code} className='flex gap-2 items-center'>
      <svg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'>
        <rect y='7' width='9' height='9' rx='2' transform='rotate(-45 0 7)' fill='#F0C865' />
      </svg>
      <div className='truncate w-full text-sm leading-6 font-medium text-[#292929]'>{refCode.code}</div>
      <CopyToClipboard
        text={refCode.code}
        onCopy={() => {
          toast(`Copied ${refCode.code} to clipboard`, {
            type: 'success',
          })
        }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          className='cursor-pointer'>
          <g clipPath='url(#clip0_183_3898)'>
            <path
              d='M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z'
              stroke='#6D3A0A'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M3.33337 10.0002H2.66671C2.31309 10.0002 1.97395 9.85969 1.7239 9.60964C1.47385 9.35959 1.33337 9.02045 1.33337 8.66683V2.66683C1.33337 2.31321 1.47385 1.97407 1.7239 1.72402C1.97395 1.47397 2.31309 1.3335 2.66671 1.3335H8.66671C9.02033 1.3335 9.35947 1.47397 9.60952 1.72402C9.85956 1.97407 10 2.31321 10 2.66683V3.3335'
              stroke='#6D3A0A'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <clipPath id='clip0_183_3898'>
              <rect width='16' height='16' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </CopyToClipboard>
    </div>
  )
}
