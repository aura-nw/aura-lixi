export type Account = {
  id: string
  username: string
  avatar_url: string
  code?: string
  isFollowed?: boolean
  specialRequestId?: number
  refferal_code?: {
    code: string
    isUsed: boolean
  }[]
}
