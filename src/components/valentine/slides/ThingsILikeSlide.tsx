import { motion } from "framer-motion";
import { SlideContainer, SlideCard } from "../SlideContainer";
import { Heart } from "lucide-react";

export const ThingsILikeSlide = () => {
  const things = [
    "Your beautiful smile 😊",
    "Your amazing vibe ✨",
    "Your sense of humor 😄",
    "Your genuine kindness 💕",
    "The way you listen 👂",
    "Your infectious laughter 🎶",
    "How you make me feel 🥰",
  ];

  return (
    <SlideContainer>
      <SlideCard>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8"
        >
          Things I Like About You 💝
        </motion.h2>

        <div className="space-y-3">
          {things.map((thing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              className="flex items-center gap-4 group"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <Heart
                  className="w-5 h-5 text-love flex-shrink-0"
                  fill="currentColor"
                />
              </motion.div>
              <p className="font-body text-lg text-foreground group-hover:text-primary transition-colors">
                {thing}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center mt-8 font-cursive text-xl text-muted-foreground"
        >
          And so much more... 💫
        </motion.p>
      </SlideCard>
    </SlideContainer>
  );
};
