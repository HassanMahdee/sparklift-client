"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { IoHeartOutline, IoPeopleOutline, IoCashOutline, IoGlobeOutline } from "react-icons/io5";

const stats = [
  {
    icon: IoHeartOutline,
    value: "$2.5M+",
    label: "Funds Raised",
    description: "Total donations processed through our platform",
  },
  {
    icon: IoPeopleOutline,
    value: "15K+",
    label: "Active Supporters",
    description: "Individuals contributing to causes they care about",
  },
  {
    icon: IoCashOutline,
    value: "500+",
    label: "Successful Campaigns",
    description: "Campaigns that reached or exceeded their goals",
  },
  {
    icon: IoGlobeOutline,
    value: "30+",
    label: "Countries Reached",
    description: "Global impact across multiple nations",
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="card-body items-center text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-primary text-5xl mb-4"
        >
          <stat.icon />
        </motion.div>
        <motion.h3
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
          className="text-4xl font-bold text-primary mb-2"
        >
          {stat.value}
        </motion.h3>
        <h4 className="text-xl font-semibold mb-2">{stat.label}</h4>
        <p className="text-sm text-base-content/70">{stat.description}</p>
      </div>
    </motion.div>
  );
}

export default function OurImpacts() {
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
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            See how SparkLift is making a difference in communities worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
