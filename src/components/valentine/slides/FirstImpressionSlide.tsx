import { motion } from "framer-motion";
import { SlideContainer, SlideCard } from "../SlideContainer";
import { AnimatedText } from "../AnimatedText";
import { Camera, Sparkles } from "lucide-react";

export const FirstImpressionSlide = () => {
  const memories = [
    { text: "The first time I saw you...", delay: 0.5 },
    { text: "Something just clicked.", delay: 1.0 },
    { text: "Your presence was magnetic.", delay: 1.5 },
  ];

  return (
    <SlideContainer>
      <SlideCard className="relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-full h-full text-gold" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <Camera className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8"
        >
          How We Met ✨
        </motion.h2>

        <div className="space-y-6">
          {memories.map((memory, index) => (
            <AnimatedText key={index} delay={memory.delay}>
              <motion.div
                className="bg-secondary/50 p-4 rounded-xl border border-primary/10 transform"
                whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                style={{
                  transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                <p className="text-lg font-body text-foreground text-center">
                  {memory.text}
                </p>
              </motion.div>
            </AnimatedText>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center mt-8 text-muted-foreground font-body italic"
        >
          From that moment, I knew you were different 💫
        </motion.p>
      </SlideCard>
    </SlideContainer>
  );
};
