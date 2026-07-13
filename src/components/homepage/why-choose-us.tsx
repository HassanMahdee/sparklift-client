"use client";

import { motion } from "framer-motion";
import {
  IoShieldCheckmark,
  IoFlash,
  IoHeart,
  IoPeople,
  IoLockClosed,
  IoGlobe,
} from "react-icons/io5";

const features = [
  {
    icon: IoShieldCheckmark,
    title: "Secure Transactions",
    description:
      "Your donations are protected with bank-level encryption and fraud detection systems.",
  },
  {
    icon: IoFlash,
    title: "Instant Impact",
    description:
      "Funds reach campaigns immediately, allowing for rapid response when it matters most.",
  },
  {
    icon: IoHeart,
    title: "Transparent Giving",
    description:
      "Track every dollar with real-time updates and detailed financial reports.",
  },
  {
    icon: IoPeople,
    title: "Community Driven",
    description:
      "Join a vibrant community of supporters and creators working towards common goals.",
  },
  {
    icon: IoLockClosed,
    title: "Low Fees",
    description:
      "We keep our platform fees minimal so more of your donation goes to the cause.",
  },
  {
    icon: IoGlobe,
    title: "Global Reach",
    description:
      "Support and create campaigns from anywhere in the world with our international platform.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose SparkLift?</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            We&apos;re committed to making fundraising more effective,
            transparent, and accessible for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card bg-base-200 hover:bg-base-300 transition-colors duration-300"
            >
              <div className="card-body items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-primary text-4xl mb-4"
                >
                  <feature.icon />
                </motion.div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-sm text-base-content/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
