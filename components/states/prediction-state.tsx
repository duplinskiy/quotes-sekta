"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Share2, Send, Check, X, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useButtonSound } from "../button-sound"

interface PredictionStateProps {
  quoteUrl: string
  onNextQuote: () => void
}

const AnimatedCheckItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start space-x-4">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative flex-shrink-0 mt-1"
    >
      <motion.div
        className="w-6 h-6 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, #FF69B4 0%, #9370DB 100%)",
          border: "2px solid white",
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Check className="w-4 h-4 stroke-[3] text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex-1"
    >
      {children}
    </motion.span>
  </div>
)

const ScrollArrow = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-16 left-6 z-50 md:bottom-1/3"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="flex flex-col items-center space-y-2"
      >
        <motion.svg width="40" height="20" viewBox="0 0 40 20" className="text-white">
          <motion.path
            d="M2 2 L20 18 L38 2"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

export function PredictionState({ quoteUrl, onNextQuote }: PredictionStateProps) {
  const [showInstructions, setShowInstructions] = useState(false)
  const playButtonSound = useButtonSound()

  const quoteId = quoteUrl.match(/\/quotes\/(\d+)\.jpg/)?.[1] || "1"
  const quotePageUrl = `https://www.quotes-sekta.ru/quote/${quoteId}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Цитаты Артура Сита",
          text: "Посмотри, какие ублюдские цитаты Артура Сита здесь собраны!",
          url: quotePageUrl,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const shareToSocial = (platform: string) => {
    const shareUrl = encodeURIComponent(quotePageUrl)
    const text = encodeURIComponent("Посмотри, какие ублюдские цитаты Артура Сита здесь собраны!")

    const shareUrls: Record<string, string> = {
      telegram: `https://t.me/share/url?url=${shareUrl}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${text}`,
    }

    if (platform === "instagram") {
      setShowInstructions(true)
    } else {
      window.open(shareUrls[platform], "_blank")
    }
  }

  const saveImageAndShowInstructions = async () => {
    try {
      const response = await fetch(quoteUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "message_from_Sila.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error saving image:", error)
    }
  }

  return (
    <div className="relative min-h-[200vh]">
      <ScrollArrow />
      <div
        className="sticky top-0 w-full min-h-screen flex flex-col items-center justify-start p-4"
        style={{
          background: `linear-gradient(180deg, 
            rgba(255,192,203,0.9) 0%, 
            rgba(216,180,216,0.9) 50%, 
            rgba(147,112,147,0.9) 100%)`,
        }}
      >
        <motion.div
          className="max-w-4xl w-full mx-auto text-center space-y-3 mb-4 pt-4 text-white px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <motion.h2
              className="text-xl font-semibold leading-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Послание от Артура Сила готово, теперь ты можешь поставить его на обои своего телефона, чтобы глубже понять его суть
            </motion.h2>
            <motion.p
              className="text-base leading-snug mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              А еще поделись этим посланием в соцсетях:
            </motion.p>
            <div className="text-left space-y-2 pl-4 text-sm">
              <AnimatedCheckItem>Сохрани картинку</AnimatedCheckItem>
              <AnimatedCheckItem>Выложи в сторис</AnimatedCheckItem>
              <AnimatedCheckItem>
                Отметь аккаунт Артура и прикрепи ссылку на этот сайт, чтобы твои друзья тоже смогли получить послание
              </AnimatedCheckItem>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative max-w-lg w-full mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 bg-black/20 rounded-2xl blur-xl transform scale-105"
              style={{ filter: "blur(20px)" }}
            />
            <img
              src={quoteUrl || "/placeholder.svg"}
              alt="Предсказание"
              className="relative w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2 px-4">
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full px-2"
              onClick={() => shareToSocial("telegram")}
            >
              <Send className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline ml-1 truncate">Telegram</span>
            </Button>
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full px-2"
              onClick={() => shareToSocial("facebook")}
            >
              <Facebook className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline ml-1 truncate">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full px-2"
              onClick={() => shareToSocial("instagram")}
            >
              <Instagram className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline ml-1 truncate">Instagram</span>
            </Button>
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full px-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline ml-1 truncate">Share</span>
            </Button>
          </div>

          <div className="mt-6 px-4">
            <Button
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none font-normal text-lg rounded-xl h-14 shadow-lg hover:shadow-xl transition-all"
              onClick={onNextQuote}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Ещё цитату
            </Button>
          </div>

          <p className="text-white leading-snug mt-4 text-center">или</p>
        </motion.div>

        <motion.div
          className="mt-2 text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none font-normal text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="https://www.wiki-sekta.ru/" target="_blank">
              Перейти на сайт wiki
            </Link>
          </Button>
          <p className="text-white leading-snug">Получи Великое Знание о Манипуляциях и Сектах</p>
        </motion.div>
      </div>

      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Поделитесь посланием в Сторис</h3>
              <Button variant="ghost" onClick={() => setShowInstructions(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <p className="mb-4 leading-snug">
              Сохраните послание в свою галерею. Поделитесь им в сторис и отметьте аккаунт Артура @artursita✨
            </p>
            <Button
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={saveImageAndShowInstructions}
            >
              Сохранить послание
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

