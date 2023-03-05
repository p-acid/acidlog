import { LinkIcon } from '@heroicons/react/24/solid'
import { META_CONFIG } from '~/lib/config/blog'

const Footer = () => {
  return (
    <footer className='wrapper mt-24 mb-8 flex w-full justify-between'>
      <span>© 2022 by Acid. All rights reserved.</span>
      <a className='flex items-center gap-1' href={META_CONFIG.github}>
        <LinkIcon className='w-4' /> GitHub
      </a>
    </footer>
  )
}

export default Footer
