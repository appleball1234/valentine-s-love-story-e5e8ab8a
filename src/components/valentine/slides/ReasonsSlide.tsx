import { motion } from "framer-motion";
import { SlideContainer, SlideCard } from "../SlideContainer";
import { Check, Heart, Star } from "lucide-react";

export const ReasonsSlide = () => {
  const reasons = [
    { icon: "🤝", text: "I will treat you with respect" },
    { icon: "💖", text: "I will call you beautiful" },
    { icon: "🍽️", text: "I will take you to nice restaurants" },
    { icon: "🎵", text: "We can listen to your music together" },
    { icon: "🌸", text: "I am calm and will show genuine interest in you" },
    { icon: "😗", text: "BONUS: I will start watching movies and series with you!", isBonus: true },
  ];

  return (
    <SlideContainer>
      <SlideCard>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="flex justify-center mb-6"
        >
          <Star className="w-12 h-12 text-gold" fill="currentColor" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-cursive text-primary text-center mb-8"
        >
          My Promises To You 💕
        </motion.h2>

        <div className="space-y-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className={`flex items-start gap-4 p-4 rounded-xl border ${
                reason.isBonus
                  ? "bg-gradient-to-r from-gold/10 to-primary/10 border-gold/30"
                  : "bg-secondary/30 border-primary/10"
              }`}
            >
              <span className="text-2xl">{reason.icon}</span>
              <div className="flex-1">
                <p className={`font-body ${reason.isBonus ? "text-primary font-semibold" : "text-foreground"}`}>
                  {reason.text}
                </p>
                {reason.isBonus && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-sm text-muted-foreground mt-1"
                  >
                    (Yes, even your favorite romantic comedies! 🎬)
                  </motion.p>
                )}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                <Check className={`w-5 h-5 ${reason.isBonus ? "text-gold" : "text-primary"}`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center mt-8"
        >
          <Heart className="w-8 h-8 text-love pulse-heart" fill="currentColor" />
        </motion.div>
      </SlideCard>
    </SlideContainer>
  );
};
