'use client'
import TopBar from '@/assets/bar.svg'
import TopBar2 from '@/assets/bar_2.svg'
import { Bangkok } from '@/context'
import Image from 'next/image'
import RedGem from '@/assets/red-gem.svg'
import BlueGem from '@/assets/blue-gem.svg'
import GoldGem from '@/assets/gold-gem.svg'
import WhiteGem from '@/assets/white-gem.svg'
import Prize from '@/assets/prize.svg'
import Aura from '@/assets/aura.svg'
import { formatNumber, fromMicro, validate } from '@/utils'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_USER_INVENTORY, claimPrize } from '@/services'
import { useEffect, useState } from 'react'
import { CircularProgress, useDisclosure } from '@nextui-org/react'
import GiftModal from '../components/modal/giftModal'

export default function InventorySection() {
  const { data } = useSubscription(GET_USER_INVENTORY)
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [isClaimed, setIsClaimed] = useState(false)
  useEffect(() => {
    setErrorMsg('')
  }, [value])

  const claimHandler = async () => {
    try {
      if (validate(value)) {
        setIsClaimed(false)
        onOpen()
      } else {
        setErrorMsg('Invalid address.')
      }
    } catch (error: any) {
      setErrorMsg('Invalid address.')
    }
  }
  const claim = async () => {
    try {
      setLoading(true)
      const res = await claimPrize(value)
      if (res) {
        setIsClaimed(true)
        setLoading(false)
      } else {
        setLoading(false)
        onClose()
      }
    } catch (error) {
      setLoading(false)
      onClose()
    }
  }

  return (
    <>
      <GiftModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        cta={
          <div
            className='min-w-[170px] flex justify-center text-center -m-[10px] p-[10px] cursor-pointer'
            onClick={loading ? undefined : isClaimed ? onClose : claim}>
            {loading ? (
              <CircularProgress
                size='sm'
                classNames={{
                  indicator: 'stroke-[#8E0B09]',
                }}
              />
            ) : isClaimed ? (
              'Done'
            ) : (
              'Confirm'
            )}
          </div>
        }>
        <div className='flex flex-col items-center gap-4'>
          <div className={`${Bangkok.className} font-bold text-[#8E0B09]`}>
            {isClaimed ? 'All prizes claimed!' : 'Claim all prizes'}
          </div>
          {isClaimed ? (
            <>
              <Image src={Prize} alt='' className='mb-4' />
            </>
          ) : (
            <>
              <div className='text-sm leading-[18px] text-[#292929] text-center'>
                Please make sure your wallet address is correct.
                <br /> This progess is irreversible
              </div>
              <div
                className={`w-[230px] text-sm leading-[24px] p-[10px] bg-[#fff] rounded-lg shadow-[0px_4px_8.8px_0px_rgba(0,0,0,0.25)_inset] text-[#292929] break-words`}>
                {value}
              </div>
            </>
          )}
        </div>
      </GiftModal>
      <section className='flex flex-col items-center relative'>
        <Image src={TopBar} alt='' className='md:hidden' />
        <Image src={TopBar2} alt='' className='hidden md:block -mb-[5.1rem]' />
        <div className='flex -mt-1 flex-col gap-4 rounded-b-md border-x border-b border-[#D52121] p-4 w-[343px] md:w-[590px] md:ml-6 backdrop-blur-[6px] bg-[linear-gradient(180deg,rgba(117,20,20,0.50)_0%,rgba(133,7,7,0.50)_0.01%,rgba(244,63,63,0.50)_100%)]'>
          <div
            className={`text-[#FEF368] text-2xl leading-[30px] font-bold tracking-[0.24px] w-full text-center ${Bangkok.className}`}>
            Unclaimed prize
          </div>
          <div className='grid gap-2 grid-cols-[1fr_90px] text-sm leading-6'>
            <div className={`text-[#FEF368]  font-bold`}>Prize</div>
            <div className={`text-[#FEF368] font-bold text-center`}>Amount</div>
            <>
              <div className='flex items-center gap-2 h-8'>
                <Image src={RedGem} alt='' className='w-5 h-5' />
                <div>Red gem</div>
              </div>
              <div className='text-center'>
                {formatNumber(data?.lixi?.filter((d: any) => d?.prize_nft?.token_type == 'RED').length || 0)}
              </div>
            </>
            <>
              <div className='flex items-center gap-2 h-8'>
                <Image src={GoldGem} alt='' className='w-5 h-5' />
                <div>Gold gem</div>
              </div>
              <div className='text-center'>
                {formatNumber(data?.lixi?.filter((d: any) => d?.prize_nft?.token_type == 'GOLD').length || 0)}
              </div>
            </>
            <>
              <div className='flex items-center gap-2 h-8'>
                <Image src={BlueGem} alt='' className='w-5 h-5' />
                <div>Blue gem</div>
              </div>
              <div className='text-center'>
                {formatNumber(data?.lixi?.filter((d: any) => d?.prize_nft?.token_type == 'BLUE').length || 0)}
              </div>
            </>
            <>
              <div className='flex items-center gap-2 h-8'>
                <Image src={WhiteGem} alt='' className='w-5 h-5' />
                <div>White gem</div>
              </div>
              <div className='text-center'>
                {formatNumber(data?.lixi?.filter((d: any) => d?.prize_nft?.token_type == 'WHITE').length || 0)}
              </div>
            </>
            <>
              <div className='flex items-center gap-2 h-8'>
                <Image src={Aura} alt='' className='w-5 h-5' />
                <div>AURA</div>
              </div>
              <div className='text-center'>
                {formatNumber(
                  fromMicro(
                    data?.lixi?.reduce((total: any, current: any) => total + current.prize_aura, 0),
                    6
                  )
                )}
              </div>
            </>
          </div>
        </div>
        <div className='mt-4 flex items-center flex-col md:flex-row gap-3 md:items-start  w-[343px] md:w-[590px] md:ml-6'>
          <div className=' w-[343px] md:w-[590px]'>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              title='Fortune Number'
              placeholder='Enter your wallet address on Aura Network'
              className={`text-sm leading-[24px] p-[10px] bg-[#fff] rounded-lg shadow-[0px_4px_8.8px_0px_rgba(0,0,0,0.25)_inset] w-full ${
                errorMsg ? 'text-[#F23A3A]' : 'text-[#292929]'
              } focus:outline-none`}
            />
            <div className='text-sm leading-[18px] text-[#F23A3A] mt-3 w-full min-h-[18px]'>{errorMsg}</div>
          </div>
          <button
            onClick={claimHandler}
            disabled={!data?.lixi?.length}
            className='text-[#6D3A0A] disabled:text-[#292929] disabled:cursor-not-allowed w-[149px] font-medium cursor-pointer p-[10px] bg-[linear-gradient(180deg,#F3DBA9_0%,#FFA031_100%)] rounded-2xl disabled:bg-[linear-gradient(180deg,#EFEBE4_0%,#B3AAA0_100%)] [&_path]:disabled:stroke-[#9D9D9D]'>
            Claim
          </button>
        </div>
      </section>
    </>
  )
}
