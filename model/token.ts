export type Token = {
  id: string
  token_id: string
  owner: string
  type:
    | 'w1'
    | 'w2'
    | 'w3'
    | 'w4'
    | 'w5'
    | 'w6'
    | 'w7'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'b6'
    | 'b7'
    | 'g1'
    | 'g2'
    | 'g3'
    | 'g4'
    | 'g5'
    | 'g6'
    | 'g7'
    | 'r1'
    | 'r2'
    | 'r3'
    | 'r4'
    | 'r5'
    | 'r6'
    | 'r7'
    | 'shield'
  media_info: {
    onchain: {
      metadata: {
        attributes: any[]
      }
      token_uri: string
    }
  }
  cw721_contract: {
    smart_contract: {
      address: string
    }
  }
}
