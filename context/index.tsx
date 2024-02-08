'use client'
import Modal from '@/app/components/modal'
import { Account } from '@/model/account'
import { CHECK_CODE, GET_USER_CODE, GET_USER_DATA, GET_USER_REFFERAL_CODE, applyCode } from '@/services'
import { getItem, removeItem, setItem } from '@/utils/localStorage'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import axios from 'axios'
import { createClient } from 'graphql-ws'
import { setConfig } from 'next/config'
import localFont from 'next/font/local'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'
import SubcriptionProvider from './subcriptionContext'

export const Context = createContext<{
  account: Account | undefined
  disconnect: () => void
  submitCode: (value: string) => Promise<void>
}>({
  account: undefined,
  disconnect: () => {},
  submitCode: async () => {},
})
export const privateAxios = axios.create()

export const Go3 = localFont({
  src: '../assets/font/go3v2.ttf',
})
export const Bangkok = localFont({
  src: '../assets/font/bangkok.ttf',
})
export const DN = localFont({
  src: '../assets/font/dn.ttf',
})
export const Mori = localFont({
  src: [
    {
      path: '../assets/font/PPMori-Extralight.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/font/PPMori-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/font/PPMori-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
})
function ContextProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account>()
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [isInit, setIsInit] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const init = async () => {
    try {
      //set up config
      const { data } = await axios.get('/config.json')
      setConfig(data)

      //set token
      let token = searchParams.get('access_token') || getItem('token')
      if (searchParams.get('access_token')) {
        setItem('token', searchParams.get('access_token') as string)
      }

      const hasuraEndpoint = data.HASURA_ENDPOINT.split('//')
      const httpLink = new HttpLink({
        uri: `https://${hasuraEndpoint[1]}/v1/graphql`,
      })

      const wsLink = new GraphQLWsLink(
        createClient({
          url: `wss://${hasuraEndpoint[1]}/v1/graphql`,
          connectionParams: {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          },
        })
      )

      const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      })

      const splitLink = split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        },
        wsLink,
        httpLink
      )

      const client = new ApolloClient({
        link: authLink.concat(splitLink),
        cache: new InMemoryCache(),
      })
      setClient(client)

      //setup private axios
      privateAxios.interceptors.request.use(
        (config) => {
          const token = getItem('token')
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
          return config
        },
        (error) => {
          Promise.reject(error)
        }
      )

      //fetch user data
      if (token) {
        const userData = await client.query({
          query: GET_USER_DATA,
        })
        if (userData.data.users?.[0]) {
          const codeData = await client.query({
            query: GET_USER_CODE(userData.data.users?.[0].id),
          })
          const refferalCodeData = await client.query({
            query: GET_USER_REFFERAL_CODE,
          })
          const refferalCode = await client.query({
            query: CHECK_CODE(refferalCodeData?.data?.referrals.map((c: any) => c.code)),
          })
          setAccount({
            ...userData.data.users?.[0],
            code: codeData.data.task_referrals.length ? codeData.data.task_referrals[0].code : undefined,
            refferal_code: refferalCodeData?.data?.referrals.map((code: any) => {
              const refCode = code.code
              return {
                code: refCode,
                isUsed: refferalCode.data.task_referrals.some((c: any) => c.code == refCode),
              }
            }),
          })
        }
        router.push(location.pathname)
      }
      setIsInit(false)
    } catch (error: any) {
      console.log(error?.message)
      if (error?.message.includes('JWT')) {
        setAccount(undefined)
        removeItem('token')
        setIsInit(false)
      }
    }
  }

  useEffect(() => {
    init()
  }, [])

  const disconnect = () => {
    setAccount(undefined)
    removeItem('token')
    client?.resetStore()
    router.push('/')
  }

  const submitCode = async (code: string) => {
    const res = await applyCode(code)
    if (res?.data) {
      setAccount({
        ...(account as Account),
        code,
      })
    } else {
      throw new Error(res?.response?.data?.message || 'Something went wrong. Please try again')
    }
  }

  if (isInit || !client)
    return (
      <Modal isOpen={true} onOpenChange={() => {}} isLoading>
        Initializing
      </Modal>
    )
  return (
    <Context.Provider
      value={{
        account,
        disconnect,
        submitCode,
      }}>
      <ApolloProvider client={client}>
        <SubcriptionProvider>{children}</SubcriptionProvider>
      </ApolloProvider>
    </Context.Provider>
  )
}
export default ContextProvider
