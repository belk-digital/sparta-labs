import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`} suppressHydrationWarning>
      <head />
      <body
        className="h-full antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
