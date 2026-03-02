"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface InitialStateProps {
  onStart: () => void
}

export function InitialState({ onStart }: InitialStateProps) {
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
        className="relative z-10 flex items-center justify-center h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="text-2xl px-12 py-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none text-white font-medium rounded-xl"
          >
            Начать
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

