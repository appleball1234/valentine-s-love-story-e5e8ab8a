import { useState } from "react";
import { motion } from "framer-motion";
import { SlideContainer } from "../SlideContainer";
import { GiftBox } from "../GiftBox";
import { Heart } from "lucide-react";

export const LoveLetterSlide = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <SlideContainer>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8"
      >
        A Letter From My Heart 💌
      </motion.h2>

      <GiftBox isOpened={isOpened} onOpen={() => setIsOpened(true)}>
        <motion.div
          className="relative bg-card p-8 md:p-10 rounded-lg max-w-lg mx-auto"
          style={{
            boxShadow: "0 10px 40px hsl(350 50% 30% / 0.15)",
            background: "linear-gradient(145deg, hsl(40, 30%, 98%) 0%, hsl(40, 20%, 95%) 100%)",
          }}
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Letter paper effect */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/20 via-love/30 to-primary/20" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-cursive text-2xl text-primary mb-4">My Dearest,</p>
            
            <div className="space-y-4 font-body text-foreground/90 leading-relaxed">
              <p>
                Every moment with you feels like a beautiful dream I never want to wake up from. 
                Your presence in my life has painted my world with colors I never knew existed.
              </p>
              <p>
                The way you laugh, the way you care, the way you make even ordinary days feel extraordinary—
                these are the things I treasure most about you.
              </p>
              <p>
                You are my sunshine on cloudy days, my calm in the storm, and my reason to smile. 
                Thank you for being you, and for letting me be a part of your world.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <p className="font-cursive text-xl text-primary">Forever yours</p>
              <Heart className="w-5 h-5 text-love" fill="currentColor" />
            </div>
          </motion.div>

          {/* Decorative flowers */}
          <motion.div
            className="absolute -bottom-4 -right-4 text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute -top-4 -left-4 text-3xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🌷
          </motion.div>
        </motion.div>
      </GiftBox>
    </SlideContainer>
  );
};
