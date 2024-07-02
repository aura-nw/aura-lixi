import { Chain } from '@chain-registry/types'
export const Mainnet: Chain = {
  $schema: '../chain.schema.json',
  chain_name: 'aura',
  status: 'live',
  network_type: 'mainnet',
  website: 'https://aura.network/',
  pretty_name: 'Aura Network',
  chain_id: 'aura_6322-2',
  bech32_prefix: 'aura',
  daemon_name: 'aurad',
  node_home: '$HOME/.aura',
  key_algos: ['secp256k1'],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: 'uaura',
        fixed_min_gas_price: 0.001,
        low_gas_price: 0.001,
        average_gas_price: 0.002,
        high_gas_price: 0.0025,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: 'uaura',
      },
    ],
    lock_duration: {
      time: '172800s',
    },
  },
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png',
    svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg',
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc.aura.network/',
        provider: 'Aura Network Foundation',
      },
    ],
    rest: [
      {
        address: 'https://lcd.aura.network/',
        provider: 'Aura Network Foundation',
      },
    ],
    grpc: [
      {
        address: 'http://grpc.aura.network:9090',
        provider: 'Aura Network Foundation',
      },
    ],
  },
  explorers: [
    {
      kind: 'aurascan',
      url: 'https://aurascan.io',
      tx_page: 'https://aurascan.io/tx/${txHash}',
      account_page: 'https://aurascan.io/address/${accountAddress}',
    },
  ],
  images: [
    {
      png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png',
      svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg',
    },
  ],
}
