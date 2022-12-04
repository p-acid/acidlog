import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'Devlog',
  description: '개발자 박산성입니다. 정돈된 글을 위해 노력합니다.',
  openGraph: {
    type: 'website',
    title: 'Devlog',
    description: '개발자 박산성입니다. 정돈된 글을 위해 노력합니다.',
    images: [
      {
        url: '/banner.png',
        alt: 'blog logo'
      }
    ],
    siteName: 'My Blog'
  }
}

export default config
