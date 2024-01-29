'use client'
import { ReactNode, createContext, useState } from 'react'

export const Context = createContext({
  account: undefined,
})
function ContextProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState()
  return (
    <Context.Provider
      value={{
        account,
      }}>
      {children}
    </Context.Provider>
  )
}
export default ContextProvider
