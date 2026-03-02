"use client"

import { useEffect, useRef } from "react"

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background_audio-81pF4O4GOh9h9GD8QprqBaORJTEMfm.mp3",
    )
    audioRef.current = audio
    audio.loop = true
    audio.volume = 0.23 // Set volume to 23%

    const playAudio = () => {
      audio.play().catch((error) => console.error("Audio playback failed:", error))
    }

    // Try to play immediately
    playAudio()

    // Add event listeners to try playing audio on user interaction
    const userInteractionEvents = ["click", "touchstart", "keydown"]
    userInteractionEvents.forEach((event) => {
      document.addEventListener(event, playAudio, { once: true })
    })

    return () => {
      audio.pause()
      audio.src = ""
      userInteractionEvents.forEach((event) => {
        document.removeEventListener(event, playAudio)
      })
    }
  }, [])

  return null
}

