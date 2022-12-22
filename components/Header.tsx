import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { META_CONFIG } from '~/lib/config/blog'

const Header = () => {
  const { theme, setTheme } = useTheme()

  const switchTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
      return
    }

    setTheme('dark')
  }, [setTheme, theme])

  const ThemeIcon = useCallback(
    (props: { className: string }) => {
      if (theme === 'light') return <SunIcon {...props} />
      if (theme === 'dark') return <MoonIcon {...props} />

      return <Cog6ToothIcon {...props} />
    },
    [theme]
  )

  return (
    <nav className='wrapper sticky top-0 z-10 flex w-full items-center justify-between bg-white py-4 transition duration-300 dark:bg-dark'>
      <a href={'/'} className='text-3xl'>
        {META_CONFIG.title}
      </a>
      <button onClick={switchTheme}>
        <ThemeIcon className='h-7 w-7' />
      </button>
    </nav>
  )
}

export default Header
