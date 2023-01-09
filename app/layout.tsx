import './globals.css'
import { Inter } from '@next/font/google'
import { SideMenu } from '../components/_sidemenu/SideMenu'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} lang="en">
      <head />
      <body>
        <SideMenu />
        {children}
      </body>
    </html>
  )
}
