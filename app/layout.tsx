import type { Metadata } from 'next'
import { Inter,Josefin_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const josefin=Josefin_Sans({subsets:['latin']})
export const metadata: Metadata = {
  title: 'Construction App',
  description: 'Construction Advisory App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={josefin.className}>
        <div>
          {children}
        </div>
         <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 Francis Consite App</p>
        </footer>
      <Toaster/>
      </body>
      
    </html>
  )
}
