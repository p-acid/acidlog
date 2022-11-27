import { ReactNode } from 'react'
import Footer from '../components/Footer.server'
import Header from '../components/Header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='relative flex min-h-screen flex-col items-center gap-4'>
      <Header />
      <main className='wrapper'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
