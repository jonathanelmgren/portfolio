import './globals.css'
import { Space_Grotesk } from "next/font/google"
import { SideMenu } from '../components/_sidemenu/SideMenu'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space--grotesk',
  weight: ['300', '400', '500', '700'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={spaceGrotesk.variable} lang="en">
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
