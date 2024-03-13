import c98 from '@/assets/c98.svg'
import keplr from '@/assets/keplr.svg'
import leap from '@/assets/leap.svg'
import TopBar from '@/assets/top-bar.svg'
import { ModalContent, Modal as NextModal } from '@nextui-org/react'
import { WalletModalProps } from 'cosmos-kit'
import Image from 'next/image'
import { isMobile } from 'react-device-detect'
export default function ConnectWalletModal({ isOpen, setOpen, walletRepo }: WalletModalProps) {
  return (
    <NextModal
      isOpen={isOpen}
      onOpenChange={setOpen}
      placement='center'
      classNames={{
        backdrop: 'bg-[#000]/85',
        base: `bg-transparent w-[372px] md:w-[509px] m-0 p-0 max-w-none rounded-none text-[#292929]`,
        closeButton: 'hidden',
      }}>
      <ModalContent>
        <Image src={TopBar} alt='' className='w-[372px] md:w-[509px] h-auto relative z-10' />
        <div className='bg-[#ECE1C8] w-[343px] md:w-[466px] relative -mt-3 mx-auto rounded-b-md p-5'>
          <div className='font-bold text-center pb-5'>Connect your wallet</div>
          <div className='text-sm'>Select a provider to connect or create a wallet</div>
          <div className='my-3 flex flex-col gap-1'>
            {walletRepo?.wallets.map(({ walletName, connect }, index) =>
              walletName.includes('keplr') ? (
                <div
                  key={index}
                  className={`p-2 rounded-[8px] flex gap-3 items-center bg-[#fff] ${
                    isMobile || (!isMobile && !window.keplr)
                      ? 'cursor-not-allowed opacity-60 pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                  onClick={() => connect(true)}>
                  <Image src={keplr} alt='' />
                  <div className='text-sm font-semibold text-[#161618]'>Keplr</div>
                </div>
              ) : walletName.includes('leap') ? (
                <div
                  key={index}
                  className={`p-2 rounded-[8px] flex gap-3 items-center bg-[#fff] ${
                    !isMobile && !window.coin98?.keplr
                      ? 'cursor-not-allowed opacity-60 pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                  onClick={() => connect(true)}>
                  <Image src={leap} alt='' />
                  <div className='text-sm font-semibold text-[#161618]'>Leap</div>
                </div>
              ) : (
                <div
                  key={index}
                  className={`p-2 rounded-[8px] flex gap-3 items-center bg-[#fff] ${
                    !isMobile && !window.coin98?.keplr
                      ? 'cursor-not-allowed opacity-60 pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                  onClick={() => connect(true)}>
                  <Image src={c98} alt='' />
                  <div className='text-sm font-semibold text-[#161618]'>Coin98</div>
                </div>
              )
            )}
          </div>
          <div className='text-sm'>
            By connecting your wallet, you agree to our <strong>Terms of Service</strong> and{' '}
            <strong>Privacy Policy.</strong>
          </div>
        </div>
      </ModalContent>
    </NextModal>
  )
}
