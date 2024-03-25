import { GasPrice } from '@cosmjs/stargate'
import { Chain } from '@chain-registry/types'
import { bech32 } from 'bech32'
import BigNumber from 'bignumber.js'
import { Decimal } from '@cosmjs/math'
export const formatNumber = (number: number | string, fraction?: number) => {
  if (!number || isNaN(+number)) return 0
  const defaultFraction = 8 - Math.min(8, (Math.round(+number).toString().length - 1) * 2)
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: fraction || defaultFraction,
  }).format(+number)
}

export const toMicro = (amount: string | number, decimal: number | string = 18) => {
  return BigNumber(amount).times(BigNumber(10).pow(decimal)).toFixed()
}

export const fromMicro = (amount?: string | number, decimal: number | string = 18) => {
  return BigNumber(amount || 0)
    .div(BigNumber(10).pow(decimal))
    .toFixed()
}
export const validate = (bech32Address: string) => {
  const { prefix: decodedPrefix } = bech32.decode(bech32Address)
  return 'aura' == decodedPrefix
}
export const shortHash = (hash: string) => {
  const pre = hash.slice(0, 8)
  const suf = hash.slice(-8)
  return `${pre}...${suf}`
}
export const shorten = (string: string, preCh?: number, sufCh?: number) => {
  const pre = string.slice(0, preCh || 5)
  const suf = string.slice(-(sufCh || 5))
  return `${pre}...${suf}`
}
export const getGasPriceByChain = (chain: Chain) => {
  const data = chain.fees?.fee_tokens[0]
  let gasStep = data?.average_gas_price || 0
  let pow = 1

  while (!Number.isInteger(gasStep)) {
    gasStep = gasStep * Math.pow(10, pow)
    pow++
  }

  return new GasPrice(Decimal.fromAtomics(gasStep.toString(), pow) as any, data?.denom as string)
}
