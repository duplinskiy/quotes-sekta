"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Share2, Twitter, Check, X } from "lucide-react"
import Link from "next/link"
import { useButtonSound } from "../button-sound"

interface PredictionStateProps {
  quoteUrl: string
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
      className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 md:bottom-1/3"
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

export function PredictionState({ quoteUrl }: PredictionStateProps) {
  const [showInstructions, setShowInstructions] = useState(false)
  const { scrollYProgress } = useScroll()
  const playButtonSound = useButtonSound()

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Мое послание Силы",
          text: "Посмотри, какое послание Силы я получил!",
          url: quoteUrl,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(quoteUrl)
    const text = encodeURIComponent("Посмотри, какое послание Силы я получил!")

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
    }

    if (platform === "instagram") {
      setShowInstructions(true)
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank")
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
          className="max-w-2xl mx-auto text-center space-y-6 mb-8 pt-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <motion.h2
              className="text-2xl font-semibold leading-none mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Послание для от Артура Сила готово, теперь ты можешь поставить его на обои своего телефона, чтобы глубже понять его суть
            </motion.h2>
            <motion.p
              className="text-lg leading-snug mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              А еще поделись этим посланием в соцсетях:
            </motion.p>
            <div className="text-left space-y-3 pl-4">
              <AnimatedCheckItem>Сохрани картинку</AnimatedCheckItem>
              <AnimatedCheckItem>Выложи в сторис</AnimatedCheckItem>
              <AnimatedCheckItem>
                Отметь аккаунт Артура и прикрепи ссылку на этот сайт, чтобы твои друзья тоже смогли получить послание
              </AnimatedCheckItem>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity, scale }} className="relative max-w-lg w-full mx-auto">
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

          <div className="mt-8 grid grid-cols-2 gap-4 px-4">
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full"
              onClick={() => shareToSocial("twitter")}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full"
              onClick={() => shareToSocial("facebook")}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full"
              onClick={() => shareToSocial("instagram")}
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
            <Button
              variant="outline"
              className="bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all w-full"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center space-y-4"
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
          <p className="text-white leading-snug">Получи Великое Знание о Человеке, которое она хранит</p>
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

