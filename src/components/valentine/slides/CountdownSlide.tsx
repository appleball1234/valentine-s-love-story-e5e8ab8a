import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideContainer } from "../SlideContainer";
import { Heart, Clock } from "lucide-react";

// Set your start date here!
const TOGETHER_SINCE = new Date("2025-02-14T00:00:00");

interface TimeUnit {
  value: number;
  label: string;
}

const getTimeTogether = (): TimeUnit[] => {
  const now = new Date();
  const diff = now.getTime() - TOGETHER_SINCE.getTime();

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];
};

export const CountdownSlide = () => {
  const [time, setTime] = useState<TimeUnit[]>(getTimeTogether());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeTogether());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SlideContainer>
      {/* Pulsing rings background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: 200 + i * 120,
              height: 200 + i * 120,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="glass-card p-8 md:p-12 max-w-lg w-full mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="flex justify-center mb-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-10 h-10 text-primary" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-cursive text-primary text-center mb-2 glow-text"
        >
          Together Since
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center font-body text-muted-foreground mb-8"
        >
          {TOGETHER_SINCE.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          💕
        </motion.p>

        {/* Timer digits */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {time.map((unit, i) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
              className="text-center"
            >
              <motion.div
                className="bg-gradient-to-br from-primary/10 to-love/10 border border-primary/20 rounded-xl p-3 md:p-4 mb-2 relative overflow-hidden"
                animate={
                  unit.label === "Seconds"
                    ? { borderColor: ["hsl(340 82% 52% / 0.2)", "hsl(340 82% 52% / 0.5)", "hsl(340 82% 52% / 0.2)"] }
                    : {}
                }
                transition={{ duration: 1, repeat: Infinity }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <span className="text-3xl md:text-4xl font-cursive text-primary relative z-10">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </motion.div>
              <span className="text-xs md:text-sm font-body text-muted-foreground">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hearts joining */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-8 gap-1"
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-love" fill="currentColor" />
          </motion.div>
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-4 font-cursive text-lg text-muted-foreground"
        >
          ...and counting every beautiful second 💫
        </motion.p>
      </div>
    </SlideContainer>
  );
};
