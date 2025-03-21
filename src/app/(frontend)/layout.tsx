import './globals.css'
import { Playfair_Display, Inter, Lora } from 'next/font/google'
import LayoutWrapper from '@/components/LayoutWrapper'
// import { ThemeProvider } from "next-themes";

// Load fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

// const playfairDisplay = Playfair_Display({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-playfair-display',
// })

export const metadata = {
  title: 'Social Media for Humanists',
  description: 'Social Media for Humanists',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
