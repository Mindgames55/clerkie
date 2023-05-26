import './globals.css'
import styles from './layout.module.css'
import { Inter } from 'next/font/google'
import MainHeader from '@/components/common/MainHeader'
import SideMenu from '@/components/common/SideMenu'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Clerkie challenge',
  description: 'Infinite scroller',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          <SideMenu />
          <main className={styles.main}>
            <MainHeader />
            {/* <FriendsProvider>{children}</FriendsProvider> */}
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
