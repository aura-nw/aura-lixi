import { AssetList } from '@chain-registry/types'
export const MainnetAsset: AssetList = {
  $schema: '../assetlist.schema.json',
  chain_name: 'aura',
  assets: [
    {
      description: 'The native token of Aura Network',
      denom_units: [
        {
          denom: 'uaura',
          exponent: 0,
        },
        {
          denom: 'aura',
          exponent: 6,
        },
      ],
      base: 'uaura',
      name: 'Aura',
      display: 'aura',
      symbol: 'AURA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg',
      },
      images: [
        {
          png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png',
          svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg',
        },
      ],
    },
  ],
}
export const EuphoriaAsset: AssetList = {
  $schema: '../assetlist.schema.json',
  chain_name: 'auratestnet',
  assets: [
    {
      description: 'The native token of Aura Test Network',
      denom_units: [
        {
          denom: 'ueaura',
          exponent: 0,
        },
        {
          denom: 'eaura',
          exponent: 6,
        },
      ],
      base: 'ueaura',
      name: 'EAura',
      display: 'eaura',
      symbol: 'EAURA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg',
      },
      images: [
        {
          png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png',
          svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg',
        },
      ],
    },
  ],
}
