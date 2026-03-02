"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TransitionStateProps {
  onComplete: () => void
}

export function TransitionState({ onComplete }: TransitionStateProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const notificationAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (videoRef.current && notificationAudioRef.current) {
      videoRef.current.volume = 0.5
      notificationAudioRef.current.volume = 0.1 // Set volume to 10%

      const playMedia = () => {
        videoRef.current?.play().catch((error) => console.error("Video playback failed:", error))
      }

      playMedia()

      const handleVideoEnded = () => {
        if (notificationAudioRef.current) {
          notificationAudioRef.current
            .play()
            .then(() => {
              notificationAudioRef.current?.addEventListener(
                "ended",
                () => {
                  setTimeout(onComplete, 200)
                },
                { once: true },
              )
            })
            .catch((error) => console.error("Audio playback failed:", error))
        }
      }

      videoRef.current.addEventListener("ended", handleVideoEnded)

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnded)
        }
      }
    }
  }, [onComplete])

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book-flip-sound-smaller-Tns9Zfvw3vxb3GYmTD2hH1vmkK7UoQ.mp4"
        playsInline
      />
      <audio
        ref={notificationAudioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Magic%20Transition%202-vBZVT30ud92D1g8p9aSM3UYPU2N7Ta.wav"
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.h2
          className="text-2xl md:text-4xl text-[#676767] text-center font-cormorant px-6 py-2 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Книга Мерзостей Силы выбирает твое послание
        </motion.h2>
      </motion.div>
    </motion.div>
  )
}

