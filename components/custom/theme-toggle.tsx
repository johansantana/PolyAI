'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { useTranslations } from 'next-intl'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('UserMenu')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor="theme-toggle" className=" text-sm">
        {theme === 'dark' ? t('light') : t('dark')}
      </label>
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={checked => {
          setTheme(checked ? 'dark' : 'light')
        }}
        className="cursor-pointer"
      />
    </div>
  )
}
