import type { Metadata } from "next"
import { Cormorant_SC } from "next/font/google"
import "./globals.css"
import type React from "react"

const cormorant = Cormorant_SC({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Книга Мерзостей Силы — Получи свое Послание",
  description: "Получи послание из первой Книги Мерзостей Силы - твое личное предсказание на этот день",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20at%2018.02.13-CLt8wQcHBaQEb80zyJBviDgbojZ3KG.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20at%2018.02.13-CLt8wQcHBaQEb80zyJBviDgbojZ3KG.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Книга Мерзостей Силы — Получи свое Послание",
    description: "Получи послание из первой Книги Мерзостей Силы - твое личное предсказание на этот день",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-qKbEqY4zz0u1dDWo4TmSssXcpze5AB.png",
        width: 1200,
        height: 630,
        alt: "Книга Мерзостей Силы",
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={cormorant.variable}>
      <head>
        <link
          rel="mask-icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20at%2018.02.13-CLt8wQcHBaQEb80zyJBviDgbojZ3KG.png"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-cormorant">{children}</body>
    </html>
  )
}

