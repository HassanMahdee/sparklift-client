"use client";

import { motion } from "framer-motion";
import {
  IoHeartOutline,
  IoPeopleOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoGlobeOutline,
} from "react-icons/io5";

export default function AboutPage() {
  const values = [
    {
      icon: IoHeartOutline,
      title: "Compassion",
      description:
        "We believe in the power of empathy and genuine care for others.",
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: "Transparency",
      description:
        "Every donation is tracked and reported with complete honesty.",
    },
    {
      icon: IoRocketOutline,
      title: "Innovation",
      description:
        "Leveraging technology to make giving easier and more impactful.",
    },
    {
      icon: IoPeopleOutline,
      title: "Community",
      description: "Building a global network of changemakers and supporters.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description:
        "Former nonprofit executive with 15+ years in social impact.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Tech entrepreneur passionate about scalable solutions.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      description: "Expert in campaign management and donor relations.",
    },
    {
      name: "David Kim",
      role: "Head of Partnerships",
      description: "Building bridges between organizations and communities.",
    },
  ];

  const stats = [
    { value: "$50M+", label: "Raised for Causes" },
    { value: "10K+", label: "Campaigns Launched" },
    { value: "500K+", label: "Active Donors" },
    { value: "150+", label: "Countries Reached" },
  ];

  const faqs = [
    {
      question: "How does SparkLift ensure campaign legitimacy?",
      answer:
        "We have a rigorous verification process that includes identity verification, documentation review, and ongoing monitoring. Each campaign is reviewed by our team before going live.",
    },
    {
      question: "What fees does SparkLift charge?",
      answer:
        "We maintain a transparent fee structure. Platform fees are typically 5% of donations, with payment processing fees additional. We offer reduced rates for certified nonprofit organizations.",
    },
    {
      question: "How are donations protected?",
      answer:
        "Donations are held in escrow until campaign goals are met or milestones are reached. We use secure payment processing and have refund policies for fraudulent campaigns.",
    },
    {
      question: "Can anyone start a campaign?",
      answer:
        "Yes, individuals and organizations can start campaigns after completing our verification process. We provide tools and guidance to help campaigners succeed.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About SparkLift
            </h1>
            <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
              Empowering change-makers to turn compassion into action.
              We&apos;re building a world where anyone can make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-xl p-8"
            >
              <div className="text-5xl text-primary mb-4">
                <IoRocketOutline />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-base-content/80 text-lg">
                To democratize fundraising by providing a trusted, accessible
                platform that connects passionate individuals with the causes
                they care about, making positive impact achievable for everyone.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-xl p-8"
            >
              <div className="text-5xl text-primary mb-4">
                <IoGlobeOutline />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-base-content/80 text-lg">
                A world where geographical and financial barriers no longer
                prevent people from supporting the causes they believe in,
                creating a global community united by compassion and action.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-base-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-base-content/80 text-lg mb-6">
              SparkLift was born from a simple observation: while there are
              countless people who want to help, the barriers to effective
              giving remain high. Traditional fundraising is often complex,
              expensive, and inaccessible to those who need it most.
            </p>
            <p className="text-base-content/80 text-lg mb-6">
              Founded in 2023, we set out to change that. Our team combined
              expertise in technology, nonprofit management, and community
              building to create a platform that puts the power of fundraising
              in everyone&apos;s hands.
            </p>
            <p className="text-base-content/80 text-lg">
              Today, we&apos;re proud to have facilitated over $50 million in
              donations for causes ranging from medical emergencies to education
              initiatives, from disaster relief to environmental conservation.
              Every campaign represents hope, and every donation represents
              trust that we work tirelessly to earn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-4">
                    <value.icon />
                  </div>
                  <h3 className="card-title text-xl">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 bg-primary text-primary-content">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <div className="w-24 h-1 bg-primary-content mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl text-primary mb-4">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="card-title text-xl">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-base-content/70">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Campaign",
                description:
                  "Tell your story, set your goal, and launch your campaign in minutes.",
              },
              {
                step: "2",
                title: "Share & Engage",
                description:
                  "Share your campaign with your network and engage with supporters.",
              },
              {
                step: "3",
                title: "Receive Funds",
                description:
                  "Funds are securely transferred to you once your campaign reaches its goal.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-content text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-base-content/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-base-100 shadow-lg"
              >
                <div className="card-body">
                  <h3 className="card-title text-xl mb-2">
                    <IoStarOutline className="text-primary" />
                    {faq.question}
                  </h3>
                  <p className="text-base-content/80">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-base-200 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-base-content/80 mb-8">
              Join thousands of changemakers who are already using SparkLift to
              create positive impact in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                Start a Campaign
              </button>
              <button className="btn btn-outline btn-primary btn-lg">
                Browse Campaigns
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
