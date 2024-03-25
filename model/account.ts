export type Account = {
  id: string
  username: string
  avatar_url: string
  wallet_address?: string
  code?: string
  isFollowed?: boolean
  specialRequestId?: number
  refferal_code?: {
    code: string
    isUsed: boolean
  }[]
}
