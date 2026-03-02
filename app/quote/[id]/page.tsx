import type { Metadata } from "next"
import Link from "next/link"

const TOTAL_QUOTES = 20
const BASE_URL = "https://www.quotes-sekta.ru"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return Array.from({ length: TOTAL_QUOTES }, (_, i) => ({
    id: String(i + 1),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Цитата Артура Сита #${id}`,
    description:
      "Настоящая цитата Артура Сита (Артура Силы) из внутренних чатов. Смотри больше на quotes-sekta.ru",
    openGraph: {
      title: `Цитата Артура Сита #${id}`,
      description:
        "Настоящая цитата Артура Сита (Артура Силы) из внутренних чатов и личных переписок.",
      url: `${BASE_URL}/quote/${id}`,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/quotes/${id}.jpg`,
          width: 1080,
          height: 1920,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default async function QuotePage({ params }: Props) {
  const { id } = await params
  const quoteId = Number(id)

  if (isNaN(quoteId) || quoteId < 1 || quoteId > TOTAL_QUOTES) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Цитата не найдена</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: `linear-gradient(180deg, 
          rgba(255,192,203,0.9) 0%, 
          rgba(216,180,216,0.9) 50%, 
          rgba(147,112,147,0.9) 100%)`,
      }}
    >
      <div className="max-w-lg w-full mx-auto text-center space-y-8">
        <h1 className="text-2xl md:text-3xl text-white font-semibold">
          Цитата Артура Сита #{id}
        </h1>
        <img
          src={`/quotes/${id}.jpg`}
          alt={`Цитата Артура Сита #${id}`}
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-normal text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Получить свою цитату
        </Link>
      </div>
    </div>
  )
}
