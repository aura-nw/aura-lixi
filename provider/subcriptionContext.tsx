'use client'
import { GET_LIXI, GET_TXS_HISTORY, GET_USER_ASSETS } from '@/services'
import { useSubscription } from '@apollo/client'
import { ReactNode, createContext } from 'react'

export const SubcriptionContext = createContext<{
  lixiData: { data?: any; loading: boolean }
  assetsData: { data?: any }
  txsData: { data?: any }
}>({
  lixiData: {
    data: undefined,
    loading: true,
  },
  assetsData: {
    data: undefined,
  },
  txsData: {
    data: undefined,
  },
})
function SubcriptionProvider({ children }: { children: ReactNode }) {
  const { data, loading } = useSubscription(GET_LIXI)
  const { data: assets } = useSubscription(GET_USER_ASSETS)
  const { data: txs } = useSubscription(GET_TXS_HISTORY)

  return (
    <SubcriptionContext.Provider
      value={{
        lixiData: {
          data,
          loading,
        },
        assetsData: {
          data: assets,
        },
        txsData: {
          data: txs,
        },
      }}>
      {children}
    </SubcriptionContext.Provider>
  )
}
export default SubcriptionProvider
