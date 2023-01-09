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
      <body className='bg-[url("../public/background.png")] bg-cover bg-fixed'>
        <aside>
          <SideMenu />
        </aside>
        {children}
      </body>
    </html>
  )
}
