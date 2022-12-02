import { META_CONFIG } from '~/lib/config/blog'

const Footer = () => {
  return (
    <footer className='wrapper mt-24 mb-8 flex w-full justify-between'>
      <span>© 2022 by Acid. All rights reserved.</span>
      <a href={META_CONFIG.github}>Github</a>
    </footer>
  )
}

export default Footer
