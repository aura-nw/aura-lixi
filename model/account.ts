export type Account = {
  id: string
  username: string
  avatar_url: string
  code?: string
  refferal_code?: {
    code: string
    isUsed: boolean
  }[]
}
