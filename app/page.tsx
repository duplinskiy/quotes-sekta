import { Prediction } from "@/components/prediction"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Цитаты Артура Сита (Артура Силы)",
  description:
    "Настоящие цитаты Артура Сита (Артура Силы) — скриншоты из внутренних чатов и личных переписок человека, который выдает себя за гуру по осознанности.",
  url: "https://www.quotes-sekta.ru",
  inLanguage: "ru",
  author: {
    "@type": "Organization",
    name: "Wiki-Секта",
    url: "https://www.wiki-sekta.ru/",
  },
  about: {
    "@type": "Thing",
    name: "Артур Сит (Артур Сила)",
    description:
      "Человек, выдающий себя за гуру по осознанности, чьи манипулятивные практики разобраны на wiki-sekta.ru",
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black">
        <h1 className="sr-only">
          Цитаты Артура Сита (Артура Силы) — настоящие скриншоты из внутренних чатов секты
        </h1>
        <Prediction />
      </main>
    </>
  )
}

