import { ReactNode } from 'react'
import Footer from '~/components/Footer.server'
import Header from '~/components/Header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='wrapper relative mx-auto flex min-h-screen flex-col items-center gap-4 md:w-[768px]'>
      <Header />
      <main className='min-h-screen w-full px-4'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
