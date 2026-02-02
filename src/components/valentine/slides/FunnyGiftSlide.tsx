import { useState } from "react";
import { motion } from "framer-motion";
import { SlideContainer, SlideCard } from "../SlideContainer";
import { GiftBox } from "../GiftBox";

export const FunnyGiftSlide = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <SlideContainer>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8"
      >
        A Little Surprise! 🎁
      </motion.h2>

      <GiftBox isOpened={isOpened} onOpen={() => setIsOpened(true)}>
        <SlideCard>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, times: [0, 0.5, 1] }}
            className="text-center"
          >
            <motion.p
              className="text-5xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              😄
            </motion.p>
            <motion.h3
              className="text-2xl md:text-3xl font-cursive text-primary mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Sooo... you're interested in this?
            </motion.h3>
            <motion.p
              className="text-lg font-body text-foreground mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              I knew it! You couldn't resist! 
            </motion.p>
            <motion.p
              className="text-muted-foreground font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Keep swiping for more surprises... ✨
            </motion.p>
          </motion.div>
        </SlideCard>
      </GiftBox>
    </SlideContainer>
  );
};
