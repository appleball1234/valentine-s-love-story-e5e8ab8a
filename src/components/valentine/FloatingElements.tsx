import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingElement {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  type: "heart" | "flower" | "sparkle";
}

const Heart = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Flower = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z" />
  </svg>
);

const Sparkle = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" />
  </svg>
);

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = [];
    for (let i = 0; i < 20; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 12 + Math.random() * 20,
        type: ["heart", "flower", "sparkle"][Math.floor(Math.random() * 3)] as "heart" | "flower" | "sparkle",
      });
    }
    setElements(newElements);
  }, []);

  const getColor = (type: string) => {
    switch (type) {
      case "heart":
        return "text-love";
      case "flower":
        return "text-petal";
      case "sparkle":
        return "text-gold";
      default:
        return "text-primary";
    }
  };

  const renderElement = (element: FloatingElement) => {
    const color = getColor(element.type);
    switch (element.type) {
      case "heart":
        return <Heart size={element.size} className={color} />;
      case "flower":
        return <Flower size={element.size} className={color} />;
      case "sparkle":
        return <Sparkle size={element.size} className={color} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-60"
          style={{
            left: `${element.x}%`,
            bottom: "-50px",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, 360],
            x: [0, Math.sin(element.id) * 50],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {renderElement(element)}
        </motion.div>
      ))}
    </div>
  );
};
