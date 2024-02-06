import { bech32 } from 'bech32'
import BigNumber from 'bignumber.js'

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
  const pre = hash.slice(0,8)
  const suf = hash.slice(-8)
  return `${pre}...${suf}`
}