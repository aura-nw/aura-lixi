import { privateAxios } from '@/context'
import { gql } from '@apollo/client'
import getConfig from 'next/config'
export const GET_USER_DATA = gql`
  query GET_USER_DATA {
    users {
      avatar_url
      username
      id
    }
  }
`
export const GET_USER_REFFERAL_CODE = gql`
  query GET_USER_REFFERAL_CODE {
    referrals {
      code
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
    window.alert(error?.message || 'Something went wrong')
  }
}

export const sample = async () => {
  try {
  } catch (error: any) {
    window.alert(error?.message || 'Something went wrong')
  }
}
