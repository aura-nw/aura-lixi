'use client'

import { Context } from '@/provider'
import { useChain } from '@cosmos-kit/react'
import getConfig from 'next/config'
import { redirect } from 'next/navigation'
import { ReactNode, useContext, useEffect } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const { account } = useContext(Context)
  const { address } = useChain(getConfig().COSMOSKIT_CHAINKEY)
  useEffect(() => {
    if (account?.wallet_address && address == account.wallet_address) {
      redirect('/')
    }
  }, [account?.wallet_address, address])
  return <>{children}</>
}
