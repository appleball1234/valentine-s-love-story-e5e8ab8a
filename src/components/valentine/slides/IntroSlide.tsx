import { motion } from "framer-motion";
import { SlideContainer, SlideCard } from "../SlideContainer";
import { LineByLineText } from "../AnimatedText";
import { Heart } from "lucide-react";

export const IntroSlide = () => {
  const introLines = [
    "In a world of countless souls,",
    "destiny led me to you.",
    "Your smile lights up my darkest days,",
    "your eyes hold galaxies untold.",
    "Every laugh of yours is a melody,",
    "that my heart has learned to play.",
    "You are not just someone special—",
    "you are my everything. 💕",
  ];

  return (
    <SlideContainer>
      <SlideCard>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <Heart className="w-16 h-16 text-love pulse-heart" fill="currentColor" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8 glow-text"
        >
          For Someone Who Means A Lot To Me
        </motion.h1>

        <LineByLineText
          lines={introLines}
          className="space-y-3 text-center"
          lineClassName="text-lg md:text-xl font-body text-foreground/90"
          startDelay={0.6}
        />
      </SlideCard>
    </SlideContainer>
  );
};
