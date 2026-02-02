import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface ValentineButtonProps {
  onYes: () => void;
}

export const ValentineButton = ({ onYes }: ValentineButtonProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    setNoAttempts(prev => prev + 1);
    const maxX = 150;
    const maxY = 100;
    setNoPosition({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
  };

  const getNoButtonText = () => {
    const texts = [
      "No 😢",
      "Are you sure?",
      "Really? 🥺",
      "Think again!",
      "Please? 💕",
      "Pretty please?",
      "I'll be sad 😭",
      "Click YES! 💖",
    ];
    return texts[Math.min(noAttempts, texts.length - 1)];
  };

  return (
    <div className="flex flex-col items-center gap-6 relative min-h-[120px]">
      <div className="flex gap-6 items-center justify-center relative">
        <motion.button
          onClick={onYes}
          className="px-10 py-4 bg-gradient-to-r from-primary to-love text-primary-foreground font-cursive text-2xl rounded-full shadow-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px hsl(340 80% 60% / 0.5)",
              "0 0 40px hsl(340 80% 60% / 0.8)",
              "0 0 20px hsl(340 80% 60% / 0.5)",
            ],
          }}
          transition={{
            boxShadow: { duration: 1.5, repeat: Infinity },
          }}
        >
          Yes! 💕
        </motion.button>

        <motion.button
          ref={buttonRef}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="px-8 py-4 bg-muted text-muted-foreground font-body text-lg rounded-full border-2 border-border hover:border-primary/30 transition-colors"
          animate={{
            x: noPosition.x,
            y: noPosition.y,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ position: "relative" }}
        >
          {getNoButtonText()}
        </motion.button>
      </div>

      {noAttempts >= 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground font-body text-sm"
        >
          The button keeps running away... maybe it's a sign? 😉
        </motion.p>
      )}
    </div>
  );
};
