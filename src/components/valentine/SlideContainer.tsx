import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

export const SlideContainer = ({ children, className = "" }: SlideContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SlideCard = ({ children, className = "" }: SlideContainerProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`glass-card p-8 md:p-12 max-w-lg w-full mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
};
