import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlideContainer } from "../SlideContainer";
import { Heart } from "lucide-react";
import { Confetti } from "../Confetti";

export const CelebrationSlide = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const interval = setInterval(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SlideContainer>
      {showConfetti && <Confetti />}
      
      {/* Firework hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${5 + (i * 8)}%`,
              top: "50%",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [-100, -250, -200],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              repeatDelay: 1,
            }}
          >
            <Heart
              className="w-6 h-6 text-love"
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Flower rain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${i * 7}%` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [0, 1, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
          >
            {["🌸", "🌷", "🌺", "🪷", "💐"][i % 5]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="glass-card p-10 md:p-16 text-center relative z-10"
      >
        {/* Two hearts joining animation */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="flex items-center gap-2"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-love" fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-primary" fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-cursive text-primary mb-6 glow-text"
        >
          Happy Valentine's Day!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl font-body text-foreground mb-4"
        >
          Thank you for being you ❤️
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg font-cursive text-muted-foreground"
        >
          Here's to our beautiful journey together 💕
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex justify-center gap-4 text-3xl"
        >
          {["💕", "🌹", "💖", "🌸", "💝"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </SlideContainer>
  );
};
