import HomePage from './components/homeComponents/home'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Year of the Dragon’s Li Xi`,
  description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
  metadataBase: new URL('https://lixi.aura.network'),
  openGraph: {
    title: `Year of the Dragon’s Li Xi`,
    description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
    images: [
      {
        url: 'https://campaign-fe.dev.aura.network/assets/thumb.png',
      },
    ],
    type: 'website',
    url: 'https://lixi.aura.network',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Year of the Dragon’s Li Xi`,
    description: 'Use Fortune Code to get Li Xi, Share Fortune Code for more Li Xi',
    images: ['https://campaign-fe.dev.aura.network/assets/thumb.png'],
  },
}

export default function Home() {
  return <HomePage />
}
