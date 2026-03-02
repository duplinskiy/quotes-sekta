"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface IntroStateProps {
  onStart: () => void
}

export function IntroState({ onStart }: IntroStateProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5
      videoRef.current.play().catch((error) => console.error("Video playback failed:", error))
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/introduction-loop-sound-smaller-vWLHCB1vlUe928zzICmesmaPzjnSQn.mp4"
        loop
        playsInline
        autoPlay
        muted
      />
      <div className="absolute inset-0 bg-black/30" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white"
      >
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="text-xl md:text-3xl leading-snug md:leading-normal"
          >
            Здесь собраны лишь некоторые настоящие цитаты Артура Сита — человека, который выдает себя за гуру по
            осознанности. Это скриншоты из общих внутренних чатов и личных переписок, просто нажми на кнопку и получи
            рандомную цитату Артура.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 5 }}
          className="mt-4"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none text-white font-medium rounded-xl"
          >
            Получить цитату
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

