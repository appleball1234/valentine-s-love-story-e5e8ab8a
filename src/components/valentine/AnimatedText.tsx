import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedText = ({ children, delay = 0, className = "" }: AnimatedTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedLetterProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedLetter = ({ text, className = "", delay = 0 }: AnimatedLetterProps) => {
  const letters = text.split("");

  return (
    <motion.span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.05,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface LineByLineTextProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  startDelay?: number;
}

export const LineByLineText = ({ 
  lines, 
  className = "", 
  lineClassName = "",
  startDelay = 0 
}: LineByLineTextProps) => {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: startDelay + index * 0.4,
            ease: "easeOut",
          }}
          className={`${lineClassName} glow-text`}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
};
