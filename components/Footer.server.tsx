import { META_CONFIG } from '~/lib/config/blog'

const Footer = () => {
  return (
    <footer className='wrapper my-4 flex w-full justify-between'>
      <span>© 2022 by Acid. All rights reserved.</span>
      <div>
        <a href={META_CONFIG.github}>Github</a>
      </div>
    </footer>
  )
}

export default Footer
