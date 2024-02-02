import HomePage from './components/homeComponents/home'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Year of the Dragon’s Li Xi`,
  description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
}
 
export default function Home() {
  return <HomePage />
}
