import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { FloatingElements } from "./FloatingElements";
import { IntroSlide } from "./slides/IntroSlide";
import { FirstImpressionSlide } from "./slides/FirstImpressionSlide";
import { FunnyGiftSlide } from "./slides/FunnyGiftSlide";
import { LoveLetterSlide } from "./slides/LoveLetterSlide";
import { AdmirationSlide } from "./slides/AdmirationSlide";
import { ThingsILikeSlide } from "./slides/ThingsILikeSlide";
import { ValentineQuestionSlide } from "./slides/ValentineQuestionSlide";
import { ReasonsSlide } from "./slides/ReasonsSlide";
import { CelebrationSlide } from "./slides/CelebrationSlide";
import { Confetti } from "./Confetti";

export const ValentineApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [showYesConfetti, setShowYesConfetti] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = saidYes ? 9 : 7;
  const minSwipeDistance = 50;

  const slides = [
    <IntroSlide key="intro" />,
    <FirstImpressionSlide key="first-impression" />,
    <FunnyGiftSlide key="funny" />,
    <LoveLetterSlide key="letter" />,
    <AdmirationSlide key="admiration" />,
    <ThingsILikeSlide key="things" />,
    <ValentineQuestionSlide key="question" onYes={handleYes} />,
    ...(saidYes ? [
      <ReasonsSlide key="reasons" />,
      <CelebrationSlide key="celebration" />,
    ] : []),
  ];

  function handleYes() {
    setSaidYes(true);
    setShowYesConfetti(true);
    setTimeout(() => {
      setCurrentSlide(7);
      setShowYesConfetti(false);
    }, 1500);
  }

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-background"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background gradient */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(350, 100%, 97%) 0%, hsl(340, 70%, 94%) 50%, hsl(350, 100%, 96%) 100%)",
        }}
      />

      {/* Floating elements */}
      <FloatingElements />

      {/* Confetti on YES */}
      {showYesConfetti && <Confetti />}

      {/* Main content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group"
            aria-label={`Go to slide ${i + 1}`}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === i 
                  ? "bg-primary shadow-glow" 
                  : "bg-primary/30 group-hover:bg-primary/50"
              }`}
              animate={currentSlide === i ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: currentSlide === i ? Infinity : 0 }}
            />
          </button>
        ))}
      </div>

      {/* Arrow navigation - desktop */}
      <div className="hidden md:block">
        {currentSlide > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={prevSlide}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-romantic border border-primary/20 hover:border-primary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </motion.button>
        )}

        {currentSlide < totalSlides - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={nextSlide}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-romantic border border-primary/20 hover:border-primary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </motion.button>
        )}
      </div>

      {/* Mobile swipe hint */}
      {currentSlide === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-muted-foreground font-body text-sm md:hidden"
        >
          <motion.span
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.span>
          <span>Swipe to explore</span>
          <motion.span
            animate={{ x: [5, -5, 5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      )}

      {/* Heart cursor trail effect (decorative) */}
      <div className="fixed top-6 left-6 z-20">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 text-love" fill="currentColor" />
        </motion.div>
      </div>
    </div>
  );
};
