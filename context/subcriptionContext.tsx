'use client'
import { GET_LIXI, GET_TXS_HISTORY, GET_USER_INVENTORY } from '@/services'
import { useSubscription } from '@apollo/client'
import { ReactNode, createContext } from 'react'

export const SubcriptionContext = createContext<{
  lixiData: { data?: any; loading: boolean }
  inventoryData: { data?: any }
  txsData: { data?: any }
}>({
  lixiData: {
    data: undefined,
    loading: true,
  },
  inventoryData: {
    data: undefined,
  },
  txsData: {
    data: undefined,
  },
})
function SubcriptionProvider({ children }: { children: ReactNode }) {
  const { data, loading } = useSubscription(GET_LIXI)
  const { data: inventory } = useSubscription(GET_USER_INVENTORY)
  const { data: txs } = useSubscription(GET_TXS_HISTORY)

  return (
    <SubcriptionContext.Provider
      value={{
        lixiData: {
          data,
          loading,
        },
        inventoryData: {
          data: inventory,
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
