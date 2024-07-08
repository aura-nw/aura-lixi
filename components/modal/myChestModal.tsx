import { Bangkok, Context } from '@/provider'
import Modal from '.'
import GemWithFrame from '../gem/gemWithFrame'
import { useContext, useEffect, useState } from 'react'
import { initList } from '@/constants'
import { Map } from 'immutable'
import FilledButton from '../button/filled'
import Link from 'next/link'
import CloseIc from '@/assets/ic_close.svg'
import Image from 'next/image'
import getConfig from 'next/config'
import { useChain } from '@cosmos-kit/react'
import { migrate } from '@/services'
import { toast } from 'react-toastify'
export default function MyChestModal({ isOpen, onOpenChange, onClose }: any) {
  const config = getConfig()
  const [step, setStep] = useState(1)
  const { assets, lastAssetsUpdate, fetchAssets, setBlackListId } = useContext(Context)
  const { address, chain, getSigningCosmWasmClient, chainWallet } = useChain(config.COSMOSKIT_CHAINKEY)
  const [gems, setGems] = useState<Immutable.MapOf<any>>(Map(initList))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const gemList = assets.reduce(
      (total, current) => {
        total[current.type]++
        return total
      },
      { ...initList }
    )
    setGems(Map(gemList))
  }, [assets?.length])
  const [evmAddress, setEvmAddress] = useState('')
  const [redAmount, setRedAmount] = useState(0)
  const [goldAmount, setGoldAmount] = useState(0)
  const [blueAmount, setBlueAmount] = useState(0)
  const [whiteAmount, setWhiteAmount] = useState(0)

  const handler = async () => {
    try {
      setLoading(true)
      const bl: any[] = []
      const material: any[] = []
      const msgs: any[] = []
      const input = [
        {
          type: 'sr',
          amount: redAmount,
        },
        {
          type: 'sg',
          amount: goldAmount,
        },
        {
          type: 'sb',
          amount: blueAmount,
        },
        {
          type: 'sw',
          amount: whiteAmount,
        },
      ]
      input.forEach((gem) => {
        for (let i = 0; i < gem.amount; i++) {
          const asset = assets.find((a) => a.type == gem.type && !material.find((g) => g.tokenId == a.token_id))
          material.push({
            contractAddress: asset?.cw721_contract.smart_contract.address as string,
            tokenId: asset?.token_id as string,
          })
          msgs.push({
            contract: asset?.cw721_contract.smart_contract.address,
            msg: {
              approve: {
                spender: config.OPERATOR_CONTRACT_ADDRESS,
                token_id: asset?.token_id,
              },
            },
          })
          bl.push(asset?.token_id)
        }
      })
      const client = await getSigningCosmWasmClient()
      await client.executeMultiple(
        address as string,
        msgs.map((msg) => ({
          contractAddress: msg.contract as string,
          msg: msg.msg,
        })),
        'auto'
      )

      const result = await migrate(material, evmAddress)
      if (typeof result?.data?.data) {
        toast(`Supreme Gems migration success. Please check your wallet on EVM`, {
          type: 'success',
        })
        setBlackListId(((prev: string[]) => {
          const next = [...prev, ...bl]
          return next as string[]
        }) as any)
        setRedAmount(0)
        setGoldAmount(0)
        setBlueAmount(0)
        setWhiteAmount(0)
        setEvmAddress('')
        fetchAssets()
        onClose()
        setStep(1)
      } else {
        toast(
          `Can not fetch your result. Please contact us via Discord or Telegram. Respone: ${JSON.stringify(
            result?.data
          )}`,
          {
            type: 'error',
          }
        )
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error)
      toast(error.message || 'Failed to migrate gem', {
        type: 'error',
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        {step == 2 ? (
          <div className='max-w-[464px]'>
            <div className={`${Bangkok.className} text-[#6D3A0A] text-2xl`}>Confirm wallet address to migrate</div>
            <div className='mt-8'>
              Please make sure your wallet address on EVM is correct. This progess is irreversible
            </div>
            <input
              value={evmAddress}
              readOnly
              className='text-sm mt-4 text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center placeholder:text-start w-full flex-1'
            />
            <div className='mt-4 flex gap-4 justify-center'>
              <FilledButton
                onClick={() => setStep(1)}
                className='text-[#6D3A0A] bg-[linear-gradient(180deg,#F3DBA9_0%,#FF6231_100%)]'>
                Back
              </FilledButton>
              <FilledButton isLoading={loading} onClick={handler} className=''>
                Confirm
              </FilledButton>
            </div>
          </div>
        ) : (
          <div className='max-w-[464px]'>
            <div className={`${Bangkok.className} text-[#6D3A0A] text-2xl`}>My Supreme Gems</div>
            <div className='text-sm mt-1 text-[#292929]'>On Cosmos</div>
            <div className='mt-4 flex gap-4 bg-[#D6CCB5] p-[10px] rounded-md'>
              <div className='shrink-0'>
                <GemWithFrame type='sr' />
              </div>
              <div className='flex flex-col justify-between w-full'>
                <div className='text-[#545454] text-xs'>Red Supreme</div>
                <div className='flex gap-2 items-center w-full'>
                  <input
                    type='number'
                    value={redAmount}
                    max={gems.get('sr')}
                    min={0}
                    onChange={(e) => {
                      const v = e.target.value as any
                      setRedAmount(+v)
                    }}
                    className='text-sm text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center w-full flex-1'
                  />
                  <div className='shrink-0'>{`/${gems.get('sr')}`}</div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex gap-4 bg-[#D6CCB5] p-[10px] rounded-md'>
              <div className='shrink-0'>
                <GemWithFrame type='sg' />
              </div>
              <div className='flex flex-col justify-between w-full'>
                <div className='text-[#545454] text-xs'>Gold Supreme</div>
                <div className='flex gap-2 items-center w-full'>
                  <input
                    type='number'
                    value={goldAmount}
                    max={gems.get('sg')}
                    min={0}
                    onChange={(e) => {
                      const v = e.target.value as any
                      setGoldAmount(+v)
                    }}
                    className='text-sm text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center w-full flex-1'
                  />
                  <div className='shrink-0'>{`/${gems.get('sg')}`}</div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex gap-4 bg-[#D6CCB5] p-[10px] rounded-md'>
              <div className='shrink-0'>
                <GemWithFrame type='sb' />
              </div>
              <div className='flex flex-col justify-between w-full'>
                <div className='text-[#545454] text-xs'>Blue Supreme</div>
                <div className='flex gap-2 items-center w-full'>
                  <input
                    type='number'
                    value={blueAmount}
                    max={gems.get('sb')}
                    min={0}
                    onChange={(e) => {
                      const v = e.target.value as any
                      setBlueAmount(+v)
                    }}
                    className='text-sm text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center w-full flex-1'
                  />
                  <div className='shrink-0'>{`/${gems.get('sb')}`}</div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex gap-4 bg-[#D6CCB5] p-[10px] rounded-md'>
              <div className='shrink-0'>
                <GemWithFrame type='sw' />
              </div>
              <div className='flex flex-col justify-between w-full'>
                <div className='text-[#545454] text-xs'>White Supreme</div>
                <div className='flex gap-2 items-center w-full'>
                  <input
                    type='number'
                    value={whiteAmount}
                    max={gems.get('sw')}
                    min={0}
                    onChange={(e) => {
                      const v = e.target.value as any
                      setWhiteAmount(+v)
                    }}
                    className='text-sm text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center w-full flex-1'
                  />
                  <div className='shrink-0'>{`/${gems.get('sw')}`}</div>
                </div>
              </div>
            </div>
            <div className='mt-4 font-bold'>Migrate to EVM</div>
            <div className='text-sm mt-2'>
              Supreme Dragon Gems will be no longer supported on Cosmos ..., migrate them to EVM now.
            </div>
            <input
              value={evmAddress}
              placeholder='Enter wallet address on EVM'
              onChange={(e) => {
                const v = e.target.value as any
                setEvmAddress(v)
              }}
              className='text-sm mt-4 text-[#545454] p-2 bg-[#fff] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)_inset] rounded-md text-center placeholder:text-start w-full flex-1'
            />
            <div className='flex justify-center items-center mt-4'>
              <FilledButton onClick={() => setStep(2)} className=''>
                Migrate
              </FilledButton>
            </div>
            <Link href='https://insight.aura.network/introducing-aura-evm-expanding-possibilities-for-web3-developers/' target='_blank'>
              <div className='text-[#1DA0D7] underline flex items-center gap-1 justify-center mt-4'>
                Aura EVM
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M8.00002 3.99935H4.00002C3.6464 3.99935 3.30726 4.13982 3.05721 4.38987C2.80716 4.63992 2.66669 4.97906 2.66669 5.33268V11.9993C2.66669 12.353 2.80716 12.6921 3.05721 12.9422C3.30726 13.1922 3.6464 13.3327 4.00002 13.3327H10.6667C11.0203 13.3327 11.3594 13.1922 11.6095 12.9422C11.8595 12.6921 12 12.353 12 11.9993V7.99935M7.33335 8.66602L13.3334 2.66602M13.3334 2.66602H10M13.3334 2.66602V5.99935'
                    stroke='#1DA0D7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </Link>
          </div>
        )}
      </Modal>
    </>
  )
}
