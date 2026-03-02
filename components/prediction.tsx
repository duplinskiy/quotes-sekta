"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { InitialState } from "./states/initial-state"
import { IntroState } from "./states/intro-state"
import { TransitionState } from "./states/transition-state"
import { PredictionState } from "./states/prediction-state"
import { BackgroundMusic } from "./background-music"
import { type AppState, getRandomQuoteUrl } from "@/lib/types"

export function Prediction() {
  const [state, setState] = useState<AppState>("initial")
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)

  const transition = useCallback((newState: AppState) => {
    setState(newState)
  }, [])

  const handleInitialComplete = () => transition("intro")
  const handleStart = () => transition("transition")

  const handleTransitionComplete = () => {
    setSelectedQuote(getRandomQuoteUrl())
    transition("prediction")
  }

  const handleNextQuote = () => {
    setSelectedQuote(getRandomQuoteUrl())
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative w-full min-h-screen bg-white">
      <BackgroundMusic />
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <InitialState onStart={handleInitialComplete} />
          </motion.div>
        )}
        {state === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <IntroState onStart={handleStart} />
          </motion.div>
        )}
        {state === "transition" && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <TransitionState onComplete={handleTransitionComplete} />
          </motion.div>
        )}
        {state === "prediction" && selectedQuote && (
          <motion.div
            key="prediction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <PredictionState quoteUrl={selectedQuote} onNextQuote={handleNextQuote} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

