'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { GoogleIcon } from './custom/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const FormSchema = z.object({
  email: z.email().min(3).max(100),
  password: z.string().min(6).max(100)
})

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const t = useTranslations('LoginPage')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true)
      await signIn(data.email, data.password)
      router.push('/')
      toast.success(t('loggedInSuccesss'))
    } catch {
      toast.error(t('failedToLogIn'))
    } finally {
      setLoading(false)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      router.push('/')
    } catch {
      toast.error(t('failedToSignInWithGoogle'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-balance text-sm text-muted-foreground">{t('description')}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center"></div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <Label htmlFor="password">{t('password')}</Label>
                    {/* <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      {t('forgotPassword')}
                    </a> */}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('signingIn') : t('signIn')}
          </Button>
        </form>
      </Form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          {t('orContinueWith')}
        </span>
      </div>
      <Button variant="outline" className="w-full" onClick={handleSignInWithGoogle}>
        <GoogleIcon />
        {t('loginWithGoogle')}
      </Button>
      <div className="text-center text-sm">
        {t('noAccount')}{' '}
        <Link href="/register" className="underline underline-offset-4">
          {t('signUp')}
        </Link>
      </div>
    </div>
  )
}
