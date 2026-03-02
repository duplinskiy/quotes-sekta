export type AppState = "initial" | "intro" | "transition" | "prediction"

const TOTAL_QUOTES = 20

export function getRandomQuoteUrl(): string {
  const id = Math.floor(Math.random() * TOTAL_QUOTES) + 1
  return `/quotes/${id}.jpg`
}

