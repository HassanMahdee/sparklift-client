"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoHeart, IoArrowForward } from "react-icons/io5";

export default function JoinSupporter() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-base-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="text-6xl mb-6"
          >
            <IoHeart className="mx-auto"/>
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Join Us as a Supporter</h2>
          <p className="text-lg mb-8 text-base-100/90 max-w-2xl mx-auto">
            Make a difference by supporting campaigns that matter to you. Your
            contribution, no matter the size, can change lives.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/auth/register"
              className="btn btn-lg btn-secondary text-secondary-content gap-2"
            >
              Start Supporting
              <IoArrowForward />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
