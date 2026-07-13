"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoRocket, IoArrowForward } from "react-icons/io5";

export default function FundraiseCreator() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-secondary to-secondary/80">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-secondary-content"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="text-6xl mb-6"
          >
            <IoRocket className="mx-auto"/>
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Fundraise for Your Campaign</h2>
          <p className="text-lg mb-8 text-secondary-content/90 max-w-2xl mx-auto">
            Have a cause you&apos;re passionate about? Create a campaign and start raising funds today. Our platform makes it easy to share your story and connect with supporters.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/auth/register"
              className="btn btn-lg btn-primary text-primary-content gap-2"
            >
              Start Your Campaign
              <IoArrowForward />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
