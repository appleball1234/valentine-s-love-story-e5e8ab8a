import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { Confetti } from "./Confetti";

interface GiftBoxProps {
  onOpen: () => void;
  isOpened: boolean;
  children: React.ReactNode;
}

export const GiftBox = ({ onOpen, isOpened, children }: GiftBoxProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    if (isOpened) return;
    
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setShowConfetti(true);
      onOpen();
    }, 500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.button
            key="gift"
            onClick={handleClick}
            className="relative cursor-pointer"
            animate={isShaking ? {
              x: [-5, 5, -5, 5, 0],
              rotate: [-5, 5, -5, 5, 0],
            } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary to-love rounded-2xl shadow-romantic flex items-center justify-center relative overflow-hidden">
                {/* Ribbon horizontal */}
                <div className="absolute w-full h-6 bg-gold/80 top-1/2 -translate-y-1/2" />
                {/* Ribbon vertical */}
                <div className="absolute h-full w-6 bg-gold/80 left-1/2 -translate-x-1/2" />
                {/* Bow */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gold rounded-full shadow-lg" />
                  <div className="absolute -left-2 w-6 h-4 bg-gold rounded-full transform -rotate-45" />
                  <div className="absolute -right-2 w-6 h-4 bg-gold rounded-full transform rotate-45" />
                </div>
                <Gift className="w-12 h-12 text-primary-foreground relative z-10" />
              </div>
              <motion.div
                className="absolute -inset-2 rounded-3xl"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(340 80% 60% / 0.4)",
                    "0 0 40px hsl(340 80% 60% / 0.6)",
                    "0 0 20px hsl(340 80% 60% / 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <p className="mt-6 font-cursive text-xl text-primary animate-pulse">
              Tap to open! 🎁
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      {showConfetti && <Confetti />}
    </div>
  );
};
