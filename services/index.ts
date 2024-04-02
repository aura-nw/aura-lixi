import { privateAxios } from '@/provider'
import { gql } from '@apollo/client'
import axios from 'axios'
import getConfig from 'next/config'
export const GET_USER_DATA = gql`
  query GET_USER_DATA {
    users {
      avatar_url
      username
      id
      wallet_address
    }
  }
`
export const GET_USER_ASSETS = gql`
  subscription MyQuery {
    lixi(where: { status: { _eq: "OPENED" } }) {
      created_at
      status
      type
      prize_nft
      prize_aura
      id
      updated_at
    }
  }
`
export const GET_USER_REFFERAL_CODE = gql`
  query GET_USER_REFFERAL_CODE {
    referrals(order_by: { id: desc }, limit: 5) {
      code
      id
    }
  }
`
export const GET_TXS_HISTORY = gql`
  subscription GET_TXS_HISTORY {
    tx_history(order_by: { updated_at: desc }) {
      updated_at
      tx_info {
        tx_hash
      }
      user_id
    }
  }
`
export const GET_QUESTS = gql`
  query campaigns {
    items: campaigns(where: { status: { _eq: "active" } }) {
      description
      id
      title
      code
      campaign_social_actions {
        id
        target
        social_action {
          id
          name
          social
          __typename
        }
        __typename
      }
      __typename
    }
  }
`
export const GET_LIXI = gql`
  subscription MyQuery {
    lixi(order_by: { type: desc }, where: { status: { _eq: "CREATED" } }) {
      id
      type
      status
    }
  }
`
export const GET_REQUEST_MANAGER = gql`
  subscription MyQuery($id: Int!) {
    request_manager(where: { id: { _eq: $id } }) {
      id
      request
      request_hash
      response
    }
  }
`
export const GET_JACKPOT = gql`
  query GET_JACKPOT {
    jackpots(limit: 1, where: { status: { _eq: "active" } }) {
      id
      max_star
      winner_id
      winning_numbers
      ended_at
      slot
    }
  }
`
export const GET_USER_JACKPOT = gql`
  query GET_USER_JACKPOT($user_id: Int, $jackpot_id: Int) {
    jackpot_users(
      where: { user_id: { _eq: $user_id }, jackpot_id: { _eq: $jackpot_id }, tx_status: {_eq: "success"} }
      order_by: { created_at: desc }
    ) {
      jackpot_id
      purchased_line
      id
      created_at
    }
  }
`
export const GET_USER_CODE = (id: string) => gql`
  query GET_USER_CODE {
    task_referrals(where: { referee_id: { _eq: ${id} } }) {
      code
    }
  }
`
export const GET_ASSETS = (chainKey: string) => gql`
  query queryAssetCW721(
    $contract_address: String
    $owner: String = null
  ) {
    ${chainKey} {
      cw721_token(
        where: {
          cw721_contract: {
            smart_contract: { address: { _eq: $contract_address }, name: { _neq: "crates.io:cw4973" } }
          }
          owner: { _eq: $owner }
          burned: { _eq: false }
        }
        limit: 10000,
        order_by: [{ last_updated_height: desc }, { id: desc }]
      ) {
        id
        token_id
        owner
        media_info
        cw721_contract {
            name
            symbol
            smart_contract {
              name
              address
            }
          }
      }
    }
  }
`
export const GET_USER_REF_HISTORY = (id: string) => gql`
  query GET_USER_REF_HISTORY {
    task_referrals(where: { referrer_id: { _eq: ${id} } }) {
      code
      referee_id
      created_at
      userByReferrerId {
        username
      }
    }
  }
`
export const CHECK_CODE = (code: string[]) => {
  return gql`
  query GET_USER_REF_HISTORY {
    task_referrals(where: { _or: [${code.map((c) => `{ code: { _eq: "${c}" } }`).join(',')}] }) {
      code
      referee_id
      created_at
      __typename
    }
  }
`
}

export const applyCode = async (code: string) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/referrals/apply`, {
      code,
    })
    return res
  } catch (error: any) {
    return error
  }
}

export const checkRepost = async () => {
  try {
    const res = await privateAxios.get(`${getConfig().REST_API_ENDPOINT}/campaigns/check-repost`)
    return res
  } catch (error: any) {
    // window.alert(error?.message || 'Something went wrong')
  }
}
export const checkFollow = async () => {
  try {
    const res = await privateAxios.get(`${getConfig().REST_API_ENDPOINT}/campaigns/check-follow`)
    return res
  } catch (error: any) {
    // window.alert(error?.message || 'Something went wrong')
  }
}

export const fetchLeaderboard = async () => {
  try {
    const res = await axios.get(`${getConfig().REST_API_ENDPOINT}/campaigns/leader-board`, {
      params: {
        limit: 20,
      },
    })
    return res.data
  } catch (error: any) {
    // window.alert(error?.message || 'Something went wrong')
  }
}
export const fetchHistory = async () => {
  try {
    const res = await privateAxios.get(`${getConfig().REST_API_ENDPOINT}/referrals/history`)
    return res.data
  } catch (error: any) {
    // window.alert(error?.message || 'Something went wrong')
  }
}
export const openLixi = async (id: string) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/lixi/open`, {
      id,
    })
    return res
  } catch (error: any) {
    return error
  }
}
export const claimPrize = async (walletAddress: string) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/lixi/claim`, {
      walletAddress,
    })
    return res
  } catch (error: any) {
    return error
  }
}
export const linkWallet = async (signedDoc: any, signature: any) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/users/wallets/link`, {
      signed_doc: signedDoc,
      signature,
    })
    return res
  } catch (error: any) {
    return error
  }
}
export const validateQuest = async (id: string) => {
  try {
    const res = await privateAxios.get(`${getConfig().REST_API_ENDPOINT}/campaigns/${id}/validate`)
    return res.data
  } catch (error: any) {
    return error
  }
}
export const forgeGem = async (
  base: {
    contractAddress: string
    tokenId: string
  },
  materials: {
    contractAddress: string
    tokenId: string
  }[],
  shield?: {
    contractAddress: string
    tokenId: string
  }
) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/nft-forge/forge`, {
      materials,
      base,
      shield,
    })
    return res
  } catch (error: any) {
    return error
  }
}
export const wish = async (
  id: string,
  gems: {
    contract_address: string
    token_id: string
  }[]
) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/jackpots/${id}/purchase`, {
      tokens: gems,
    })
    return res
  } catch (error: any) {
    return error
  }
}
export const sample = async () => {
  try {
  } catch (error: any) {
    return error
  }
}
