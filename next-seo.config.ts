import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'My awesome blog',
  description: 'Introduce your awesome blog!',
  openGraph: {
    type: 'website',
    title: 'My awesome blog',
    description: 'Introduce your awesome blog',
    images: [
      {
        url: '/banner.png',
        alt: 'blog logo'
      }
    ],
    siteName: 'My Blog'
  },
  twitter: {
    cardType: 'summary'
  }
}

export default config
