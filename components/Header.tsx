import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { META_CONFIG } from '~/lib/config/blog'
import { DASHBOARD } from '~/lib/config/url'

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
    <nav className='flex w-full items-center justify-between px-4 py-7'>
      <a href={DASHBOARD} className='text-4xl font-bold tracking-tight'>
        {META_CONFIG.title}
        <span className='text-lime-500 dark:text-lime-300'>.log</span>
      </a>
      <button onClick={switchTheme}>
        <ThemeIcon className='h-7 w-7' />
      </button>
    </nav>
  )
}

export default Header
