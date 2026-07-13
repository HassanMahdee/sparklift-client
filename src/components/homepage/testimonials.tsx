"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoStar } from "react-icons/io5";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Campaign Creator",
    content: "SparkLift made it incredibly easy to raise funds for my community project. The platform is intuitive and the support team was always there to help.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Supporter",
    content: "I&apos;ve supported many campaigns on different platforms, but SparkLift stands out for its transparency and low fees. I know my donations are making a real impact.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Nonprofit Director",
    content: "The tools and analytics provided by SparkLift have transformed how we manage our fundraising efforts. We&apos;ve seen a 40% increase in donations since switching.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < testimonials.length; i++) {
      indices.push((currentIndex + i) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-16 px-4 bg-base-200 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <p className="text-base-content/70">
            Hear from our community of supporters and creators
          </p>
        </motion.div>

        <div className="relative h-80">
          <AnimatePresence mode="popLayout">
            {getVisibleIndices().map((index, position) => {
              const testimonial = testimonials[index];
              const isMain = position === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: isMain ? 1 : 0.3,
                    scale: isMain ? 1 : 0.9,
                    y: isMain ? 0 : position * 20,
                    filter: isMain ? "blur(0px)" : "blur(4px)",
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    isMain ? "z-10" : "z-0"
                  }`}
                >
                  <div className="card bg-base-100 shadow-xl max-w-2xl w-full mx-4">
                    <div className="card-body items-center text-center">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <IoStar
                            key={i}
                            className="text-warning text-xl fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-lg italic mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                      <div className="mt-4">
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-base-content/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary w-8" : "bg-base-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
