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
export const GET_USER_INVENTORY = gql`
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
export const GET_CAMPAIGN = gql`
  query campaigns {
    items: campaigns {
      description
      id
      title
      code
      campaign_social_actions(where: { campaign: { status: { _eq: "active" } } }) {
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
export const GET_USER_CODE = (id: string) => gql`
  query GET_USER_CODE {
    task_referrals(where: { referee_id: { _eq: ${id} } }) {
      code
    }
  }
`
export const GET_ASSETS =(chainKey: string)=> gql`
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
        order_by: [{ last_updated_height: desc }, { id: desc }]
      ) {
        id
        token_id
        owner
        media_info
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
    window.alert(error?.message || 'Something went wrong')
  }
}
export const claimPrize = async (walletAddress: string) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_ENDPOINT}/lixi/claim`, {
      walletAddress,
    })
    return res
  } catch (error: any) {
    window.alert(error?.message || 'Something went wrong')
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
    window.alert(error?.message || 'Something went wrong')
  }
}
export const validateQuest = async (id: string) => {
  try {
    const res = await privateAxios.get(`${getConfig().REST_API_ENDPOINT}/campaigns/${id}/validate`)
    return res.data
  } catch (error: any) {
    window.alert(error?.message || 'Something went wrong')
  }
}
export const sample = async () => {
  try {
  } catch (error: any) {
    window.alert(error?.message || 'Something went wrong')
  }
}
