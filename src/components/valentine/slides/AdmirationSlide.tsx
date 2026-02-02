import { useState } from "react";
import { motion } from "framer-motion";
import { SlideContainer, SlideCard } from "../SlideContainer";
import { GiftBox } from "../GiftBox";
import { Sparkles, Heart } from "lucide-react";

export const AdmirationSlide = () => {
  const [isOpened, setIsOpened] = useState(false);

  const admirations = [
    { icon: "✨", text: "Your smile that lights up every room" },
    { icon: "💖", text: "Your kindness that touches every soul" },
    { icon: "🌟", text: "Your confidence that inspires me daily" },
    { icon: "🌹", text: "Your beauty, inside and out" },
    { icon: "💎", text: "Your uniqueness that makes you irreplaceable" },
  ];

  return (
    <SlideContainer>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8"
      >
        What I Admire About You 🌹
      </motion.h2>

      <GiftBox isOpened={isOpened} onOpen={() => setIsOpened(true)}>
        <SlideCard className="relative">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: [
                "inset 0 0 30px hsl(340 80% 60% / 0.1)",
                "inset 0 0 50px hsl(340 80% 60% / 0.2)",
                "inset 0 0 30px hsl(340 80% 60% / 0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ borderRadius: "1rem" }}
          />

          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-gold" />
            </motion.div>
          </div>

          <div className="space-y-4">
            {admirations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-primary/10"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="font-body text-foreground">{item.text}</p>
                <motion.div
                  className="ml-auto"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                >
                  <Heart className="w-5 h-5 text-love" fill="currentColor" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </SlideCard>
      </GiftBox>
    </SlideContainer>
  );
};
