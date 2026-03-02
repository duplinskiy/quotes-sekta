"use client"

import { useRef } from "react"

export function useButtonSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/button-default-click-72ijGJNVY81t4rBqlUUhfmNHoCgDQq.mp3",
      )
      audioRef.current.volume = 0.1 // 10% volume
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().catch((error) => console.error("Error playing sound:", error))
  }

  return playSound
}

