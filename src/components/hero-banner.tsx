"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const slides = [
  {
    image: "/banner-1.png",
    title: "Fueling the Next Big Breakthrough",
    subtitle: "Join our team of engineers and be part of innovation. Your donation powers the future.",
    angle: "center",
  },
  {
    image: "/banner-2.png",
    title: "Creative Visions to Life",
    subtitle: "Support indie developers bringing dreams to reality. Your contribution makes it happen.",
    angle: "left",
  },
  {
    image: "/banner-3.png",
    title: "Empowering Communities, Creating Impact",
    subtitle: "Together we grow. Join our community garden initiative and make a lasting difference.",
    angle: "right",
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getObjectPosition = (angle: string) => {
    switch (angle) {
      case "left":
        return "20% center";
      case "right":
        return "80% center";
      default:
        return "center center";
    }
  };

  const getTextDirection = (angle: string) => {
    switch (angle) {
      case "left":
        return "from-right";
      case "right":
        return "from-left";
      default:
        return "from-bottom";
    }
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentIndex && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: getObjectPosition(slide.angle) }}
                />
                {theme === "dark" && (
                  <div className="absolute inset-0 bg-black/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: getTextDirection(slide.angle) === "from-right" ? 50 : getTextDirection(slide.angle) === "from-left" ? -50 : 0, y: getTextDirection(slide.angle) === "from-bottom" ? 50 : 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center px-4 max-w-4xl"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-lg md:text-xl text-white/90 drop-shadow-md"
                    >
                      {slide.subtitle}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
