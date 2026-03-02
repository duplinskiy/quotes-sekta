import type { Metadata } from "next"
import { Cormorant_SC } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import type React from "react"

const cormorant = Cormorant_SC({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Цитаты Артура Сита (Артура Силы) — настоящие скриншоты из чатов секты",
  description:
    "Настоящие цитаты Артура Сита (Артура Силы) — скриншоты из внутренних чатов и личных переписок человека, который выдает себя за гуру по осознанности. Разбор манипуляций на wiki-sekta.ru.",
  keywords: [
    "Артур Сит",
    "Артур Сила",
    "секта",
    "манипуляции",
    "цитаты",
    "гуру",
    "осознанность",
    "wiki-sekta",
    "разоблачение",
    "культ",
  ],
  authors: [{ name: "Wiki-Секта", url: "https://www.wiki-sekta.ru/" }],
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
  metadataBase: new URL("https://www.quotes-sekta.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Цитаты Артура Сита — скриншоты из чатов секты",
    description:
      "Настоящие цитаты Артура Сита (Артура Силы) из внутренних чатов и личных переписок.",
    url: "https://www.quotes-sekta.ru/",
    type: "website",
    locale: "ru_RU",
    siteName: "Цитаты Артура Сита",
    images: [
      {
        url: "https://www.quotes-sekta.ru/og/quotes-cover.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107079838', 'ym');
          ym(107079838, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}</Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/107079838" style={{position: "absolute", left: "-9999px"}} alt="" />
          </div>
        </noscript>
      </head>
      <body className="font-cormorant">{children}</body>
    </html>
  )
}

