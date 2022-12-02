import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import DEFAULT_SEO from '../next-seo.config'

const DynamicLayout = dynamic(() => import('../app/layout'), {
  ssr: false
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <NextSeo
          {...DEFAULT_SEO}
          openGraph={{
            type: 'website',
            ...(pageProps.openGraph ?? DEFAULT_SEO.openGraph)
          }}
        />
      </Head>
      <ThemeProvider attribute='class'>
        <DynamicLayout>
          <Component {...pageProps} />
        </DynamicLayout>
      </ThemeProvider>
    </>
  )
}
