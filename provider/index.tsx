'use client'
import Modal from '@/components/modal'
import ConnectWalletModal from '@/components/modal/connectWalletModal'
import { useClient } from '@/hooks'
import { Account } from '@/model/account'
import { Token } from '@/model/token'
import { GET_ASSETS, GET_USER_DATA, applyCode } from '@/services'
import { wallets as c98Mobile } from '@/services/c98MobileWallet'
import { getGasPriceByChain } from '@/utils'
import { getItem, removeItem, setItem } from '@/utils/localStorage'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { AssetList, Chain } from '@chain-registry/types'
import { wallets as c98Extension } from '@cosmos-kit/coin98-extension'
import { wallets as keplrExtension } from '@cosmos-kit/keplr-extension'
import { wallets as keplrMobile } from '@cosmos-kit/keplr-mobile'
import { wallets as leapExtension } from '@cosmos-kit/leap-extension'
import { wallets as leapMobile } from '@cosmos-kit/leap-mobile'
import { ChainProvider } from '@cosmos-kit/react'
import { GoogleTagManager } from '@next/third-parties/google'
import { NextUIProvider } from '@nextui-org/react'
import axios from 'axios'
import { chains, assets as networkAssets } from 'chain-registry'
import { createClient } from 'graphql-ws'
import getConfig, { setConfig } from 'next/config'
import localFont from 'next/font/local'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Bounce, ToastContainer } from 'react-toastify'

export const Context = createContext<{
  account: Account | undefined
  assets: Token[]
  fetchAssets: () => void
  setAccount: (account: Account) => void
  setBlackListId: (list: string[]) => void
  horoscopeClient: ApolloClient<NormalizedCacheObject> | undefined
  disconnect: () => void
  submitCode: (value: string) => Promise<void>
  lastAssetsUpdate?: number
}>({
  account: undefined,
  assets: [],
  fetchAssets: () => {},
  horoscopeClient: undefined,
  setAccount: () => {},
  setBlackListId: () => {},
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
const testnetChains: Chain[] = [
  {
    bech32_prefix: 'aura',
    chain_id: 'aura-testnet-2',
    chain_name: 'auradevnet',
    network_type: 'testnet',
    pretty_name: 'Aura Network Devnet',
    slip44: 118,
    status: 'live',
  },
]
const testnetAssets: AssetList[] = [
  {
    assets: [
      {
        base: 'utaura',
        denom_units: [
          { denom: 'utaura', exponent: 0 },
          { denom: 'taura', exponent: 6 },
        ],
        display: 'taura',
        name: 'Aura',
        symbol: 'TAURA',
      },
    ],
    chain_name: 'auradevnet',
  },
]

const signerOptions = {
  preferredSignType: (chain: Chain) => {
    return 'direct'
  },
  signingStargate: (chain: Chain) => ({ gasPrice: getGasPriceByChain(chain) }),
  signingCosmwasm: (chain: Chain) => ({ gasPrice: getGasPriceByChain(chain) }),
}
function ContextProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account>()
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [horoscopeClient, setHoroscopeClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [assets, setAssets] = useState<Token[]>([])
  const [blackListId, setBlackListId] = useState<string[]>([])
  const [isInit, setIsInit] = useState(true)
  const [lastAssetsUpdate, setLastAssetsUpdate] = useState<number>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isClient = useClient()
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

      const horoClient = new ApolloClient({
        uri: `${data.HOROSCOPE_ENDPOINT}/api/v2/graphql`,
        cache: new InMemoryCache(),
      })
      setHoroscopeClient(horoClient)

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
          setAccount(userData.data.users?.[0])
          router.push(location.pathname)
        }
      }
      setIsInit(false)
    } catch (error: any) {
      console.log(error?.message)
      if (error?.message.includes('JWT') || error?.message.includes('token') || error?.message.includes('session')) {
        setAccount(undefined)
        removeItem('token')
        setIsInit(false)
      }
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (account?.wallet_address && horoscopeClient) {
      fetchAssets()
    }
  }, [account?.wallet_address, horoscopeClient])

  useEffect(() => {
    const newList = assets.filter((a) => !blackListId.includes(a.token_id))
    setAssets([...newList])
  }, [blackListId.length, assets.length])

  const fetchAssets = async () => {
    const chainKey = getConfig().HOROSCOPE_CHAINKEY
    let list: Token[] = []
    const v1DragonGems = await horoscopeClient?.query({
      query: GET_ASSETS(chainKey),
      variables: {
        contract_address: getConfig().DRAGON_GEM_COLLECTION_CONTRACT_ADDRESS,
        owner: account?.wallet_address,
      },
    })
    if (v1DragonGems?.data?.[chainKey]?.cw721_token?.length) {
      let v1List = v1DragonGems?.data?.[chainKey]?.cw721_token
        .filter((token: Token) =>
          token?.media_info?.onchain?.metadata?.attributes?.find((attr) => attr.trait_type == 'Color')
        )
        .map((token: Token) => {
          const color = token.media_info.onchain.metadata.attributes.find((attr) => attr.trait_type == 'Color')?.value
          let type
          switch (color) {
            case 'WHITE':
              type = 'w1'
              break
            case 'BLUE':
              type = 'b1'
              break
            case 'GOLD':
              type = 'g1'
              break
            case 'RED':
              type = 'r1'
              break
          }
          return {
            ...token,
            type,
          }
        })
      list = [...v1List]
    }
    const v2DragonGems = await horoscopeClient?.query({
      query: GET_ASSETS(chainKey),
      variables: {
        contract_address: getConfig().V2_DRAGON_GEM_COLLECTION_CONTRACT_ADDRESS,
        owner: account?.wallet_address,
      },
    })
    if (v2DragonGems?.data?.[chainKey]?.cw721_token?.length) {
      let v2List = v2DragonGems?.data?.[chainKey]?.cw721_token
        .filter((token: Token) =>
          token?.media_info?.onchain?.metadata?.attributes?.find((attr) => attr.trait_type == 'Color')
        )
        .map((token: Token) => {
          const color = token.media_info.onchain.metadata.attributes.find((attr) => attr.trait_type == 'Color')?.value
          const star = token.media_info.onchain.metadata.attributes
            .find((attr) => attr.trait_type == 'Star')
            ?.value.split('-')[0]
          let type
          switch (color) {
            case 'White':
              type = 'w'
              break
            case 'Blue':
              type = 'b'
              break
            case 'Golden':
              type = 'g'
              break
            case 'Red':
              type = 'r'
              break
          }
          return {
            ...token,
            type: type + star,
          }
        })
      list = [...list, ...v2List]
    }
    const shieldCollection = await horoscopeClient?.query({
      query: GET_ASSETS(chainKey),
      variables: {
        contract_address: getConfig().SHIELD_COLLECTION_CONTRACT_ADDRESS,
        owner: account?.wallet_address,
      },
    })
    if (shieldCollection?.data?.[chainKey]?.cw721_token?.length) {
      let shieldList = shieldCollection?.data?.[chainKey]?.cw721_token.map((token: Token) => {
        return {
          ...token,
          type: 'shield',
        }
      })
      list = [...list, ...shieldList]
    }
    setAssets(list)
    setLastAssetsUpdate(Date.now())
  }

  const disconnect = () => {
    setAccount(undefined)
    removeItem('token')
    client?.resetStore()
    router.push('/connect')
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

  if (isInit || !client || !isClient)
    return (
      <Modal isOpen={true} onOpenChange={() => {}} isLoading>
        Initializing
      </Modal>
    )
  console.log('Dragon Wish v1.0.2')
  return (
    <ChainProvider
      chains={[
        ...testnetChains,
        ...chains.filter((chain) => chain.chain_name == 'aura' || chain.chain_name == 'auratestnet'),
      ]}
      assetLists={[
        ...testnetAssets,
        ...networkAssets.filter((chain) => chain.chain_name == 'aura' || chain.chain_name == 'auratestnet'),
      ]}
      signerOptions={signerOptions as any}
      endpointOptions={{
        isLazy: true,
        endpoints: {
          auradevnet: {
            rpc: ['https://rpc.dev.aura.network'],
          },
          aura: {
            rpc: ['https://rpc.aura.network'],
          },
        },
      }}
      wallets={
        isMobile
          ? [...c98Mobile, ...keplrMobile, ...leapMobile]
          : [...c98Extension, ...keplrExtension, ...leapExtension]
      }
      walletConnectOptions={
        isMobile
          ? {
              signClient: {
                projectId: 'ea6a6ed53eeb20479f1bca45ecf9ecd6',
                relayUrl: 'wss://relay.walletconnect.org',
                metadata: {
                  name: 'Dragon Gem Wish',
                  description: 'Dragon Gem Wish',
                  url: location.hostname,
                  icons: [`${location.origin}/assets/logo.svg`],
                },
              },
            }
          : undefined
      }
      walletModal={ConnectWalletModal}>
      <Context.Provider
        value={{
          account,
          setAccount,
          disconnect,
          submitCode,
          horoscopeClient,
          setBlackListId,
          assets,
          fetchAssets,
          lastAssetsUpdate,
        }}>
        <NextUIProvider>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </NextUIProvider>
        <GoogleTagManager gtmId='GTM-5F456FKK' />
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          closeButton={() => <></>}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme='dark'
          transition={Bounce}
          limit={3}
        />
      </Context.Provider>
    </ChainProvider>
  )
}
export default ContextProvider
