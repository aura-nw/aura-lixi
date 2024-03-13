export type Token = {
  id: string
  token_id: string
  owner: string
  media_info: {
    onchain: {
      metadata: {
        attributes: any[]
      }
      token_uri: string
    }
  }
}
