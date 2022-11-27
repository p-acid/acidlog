import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'

const DynamicLayout = dynamic(() => import('../app/layout'), {
  ssr: false
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <DynamicLayout>
        <Component {...pageProps} />
      </DynamicLayout>
    </ThemeProvider>
  )
}
