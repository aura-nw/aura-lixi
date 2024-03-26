'use client'
import DragonLogo from '@/components/homeComponents/assets/dragon-logo.svg'
import { Bangkok, Context } from '@/provider'
import { useChain, useWallet } from '@cosmos-kit/react'
import { WalletStatus } from 'cosmos-kit'
import getConfig from 'next/config'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { makeSignDoc } from '@cosmjs/amino'
import { GET_USER_DATA, linkWallet } from '@/services'
import { useApolloClient, useQuery } from '@apollo/client'
import { redirect, useRouter } from 'next/navigation'
import FilledButton from '@/components/button/filled'
import c98 from '@/assets/c98.svg'
import keplr from '@/assets/keplr.svg'
import leap from '@/assets/leap.svg'
import { shorten } from '@/utils'
export default function Connect() {
  const config = getConfig()
  const client = useApolloClient()
  const router = useRouter()
  const { account, setAccount } = useContext(Context)
  const { connect, address, chain, closeView, wallet, disconnect } = useChain(config.COSMOSKIT_CHAINKEY)
  const { status: globalStatus, mainWallet } = useWallet()
  const { refetch } = useQuery(GET_USER_DATA)
  useEffect(() => {
    if (account?.wallet_address && address == account.wallet_address) {
      redirect('/')
    }
  }, [account?.wallet_address, address])
  const connectXHandler = () => {
    window.location.href = `${config.REST_API_ENDPOINT}/auth/twitter`
  }

  const linkWalletHandler = async () => {
    try {
      if (mainWallet?.client?.signArbitrary && address) {
        const msg = `Welcome to Dragon Forge!

This message is only to authenticate yourself. Please sign to proceed with using Dragon Forge.

Signing this message will not trigger a blockchain transaction or cost any gas fees.

To ensure your security, your authentication status will reset after you close the browser.

By continuing, you will link your wallet address to your X account. This process won't be irreversible.

Wallet address:
${address}

Timestamp:
${Date.now()}`
        const signDoc = makeSignDoc(
          [
            {
              type: 'sign/MsgSignData',
              value: {
                signer: address,
                data: btoa(msg),
              },
            },
          ],
          {
            gas: '0',
            amount: [],
          },
          '',
          undefined,
          '0',
          '0'
        )
        const signResult = await mainWallet.client.signArbitrary(chain.chain_id, address, msg)
        const res = await linkWallet(signDoc, signResult)
        if (res?.data) {
          const { data: userData } = await refetch()
          closeView()
          if (userData.users?.[0]) {
            console.log(userData.users?.[0])
            setAccount(userData.users?.[0])
            router.push('/')
          }
        }
      }
    } catch (error: any) {
      toast(error.message || 'Failed to link wallet', {
        type: 'error',
      })
    }
  }

  return (
    <main className='relative min-h-screen'>
      <div className='flex flex-col items-center pt-[130px] px-1 text-center'>
        <Image src={DragonLogo} alt='' className='w-[110px]' />
        <div
          className={`${Bangkok.className} mt-5 text-[#EE3724] uppercase drop-shadow-[0px_3.276px_3.276px_rgba(0,0,0,0.50)] text-[52px] font-bold leading-tight tracking-[0.524px] text-stroke`}>
          Gem Forge
        </div>
        <div className={`text-[#F9C174] text-xl font-bold uppercase tracking-[14px]`}>Quest for the Dragon's Wish</div>
        {account ? (
          account.wallet_address ? (
            address ? (
              address == account.wallet_address ? (
                <>
                  <div className='text-sm font-semibold flex items-center gap-2 mt-16'>
                    <span className='w-3 h-3 rounded-full bg-[#35ff45]'></span>
                    <span>
                      {wallet?.name.includes('keplr') ? (
                        <Image src={keplr} alt='' className='w-6 h-6' />
                      ) : wallet?.name.includes('leap') ? (
                        <Image src={leap} alt='' className='w-6 h-6' />
                      ) : (
                        <Image src={c98} alt='' className='w-6 h-6' />
                      )}
                    </span>
                    {shorten(address, 5, 5)}
                  </div>
                  <FilledButton className='mt-6' onClick={() => router.push('/')}>
                    Continue
                  </FilledButton>
                </>
              ) : (
                <>
                  <div className='text-sm font-semibold flex items-center gap-2 mt-16'>
                    <span className='w-3 h-3 rounded-full bg-[#35ff45]'></span>
                    <span>
                      {wallet?.name.includes('keplr') ? (
                        <Image src={keplr} alt='' className='w-6 h-6' />
                      ) : wallet?.name.includes('leap') ? (
                        <Image src={leap} alt='' className='w-6 h-6' />
                      ) : (
                        <Image src={c98} alt='' className='w-6 h-6' />
                      )}
                    </span>
                    {shorten(address)}
                  </div>
                  <FilledButton className='mt-6' onClick={() => disconnect()}>
                    Disconnect
                  </FilledButton>
                  <div className='mt-6 italic text-sm text-[#FEA768]'>
                    Your X Account have already linked with <strong>{shorten(account.wallet_address)}</strong>. Continue
                    by connecting to <strong>{shorten(account.wallet_address)}</strong> wallet.
                  </div>
                </>
              )
            ) : (
              <>
                <FilledButton className='mt-16' onClick={() => connect()}>
                  Connect Wallet
                </FilledButton>
                <div className='mt-6 italic text-sm text-[#FEA768]'>
                  Your X Account have already linked with <strong>{shorten(account.wallet_address)}</strong>. Continue
                  by connecting to your wallet.
                </div>
              </>
            )
          ) : (
            <>
              <FilledButton className='mt-16' onClick={() => connect()}>
                Connect Wallet
              </FilledButton>
              <div className='mt-6 italic text-sm text-[#FEA768]'>
                An X account can be linked to only one wallet and it’s irreversible
              </div>
            </>
          )
        ) : (
          <>
            <FilledButton className='mt-16' onClick={connectXHandler}>
              Connect{' '}
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='15'
                  viewBox='0 0 14 15'
                  fill='none'
                  className='inline-block'>
                  <path
                    d='M0.0340664 0.173828L5.4393 7.89563L0 14.1738H1.22427L5.98647 8.67705L9.83407 14.1738H14L8.29052 6.01777L13.3534 0.173828H12.1292L7.74358 5.2361L4.2 0.173828H0.0340664ZM1.8344 1.13723H3.74821L12.1994 13.2104H10.2856L1.8344 1.13723Z'
                    fill='#6D3A0A'
                  />
                </svg>
              </span>
            </FilledButton>
            <div className='mt-6 italic text-sm text-[#FEA768]'>Please follow steps to sign in</div>
          </>
        )}
      </div>
    </main>
  )
}
