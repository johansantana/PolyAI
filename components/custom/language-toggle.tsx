'use client'

import { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { useTranslations } from 'next-intl'

export function LanguageToggle() {
  const t = useTranslations('UserMenu')
  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from server cookie via API on mount
    const loadLocale = async () => {
      try {
        const res = await fetch('/api/locale', { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as { locale?: string }
          if (data?.locale) setLanguage(data.locale)
        }
      } catch {
        // ignore
      } finally {
        setMounted(true)
      }
    }

    loadLocale()
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor="language-toggle" className=" text-sm">
        {language === 'en' ? t('english') : t('spanish')}
      </label>
      <Switch
        id="language-toggle"
        checked={language === 'en'}
        onCheckedChange={async checked => {
          const newLanguage = checked ? 'en' : 'es'
          setLanguage(newLanguage)

          try {
            await fetch('/api/locale', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ locale: newLanguage })
            })
          } catch {
            // If the request fails, revert the optimistic update
            setLanguage(prev => (prev === 'en' ? 'es' : 'en'))
          }
        }}
        className="cursor-pointer"
      />
    </div>
  )
}
