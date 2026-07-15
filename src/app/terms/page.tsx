"use client";

import { motion } from "framer-motion";
import { IoDocumentTextOutline, IoShieldCheckmarkOutline, IoWarningOutline, IoInformationCircleOutline } from "react-icons/io5";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-primary/10 to-base-200 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <IoDocumentTextOutline className="text-4xl text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Introduction */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoInformationCircleOutline className="text-primary" />
              Introduction
            </h2>
            <p className="text-base-content/80 leading-relaxed">
              Welcome to SparkLift. By accessing or using our fundraising platform, you agree to be bound by these Terms and Conditions. 
              Please read them carefully before using our services. These terms govern your relationship with SparkLift and outline the rules 
              and guidelines for using our platform.
            </p>
          </motion.div>

          {/* Acceptance of Terms */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoShieldCheckmarkOutline className="text-secondary" />
              Acceptance of Terms
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                By accessing and using SparkLift, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must be at least 18 years old to use this platform</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You agree to notify us immediately of any unauthorized use</li>
              </ul>
            </div>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoDocumentTextOutline className="text-accent" />
              User Responsibilities
            </h2>
            <div className="space-y-4 text-base-content/80">
              <p>As a user of SparkLift, you agree to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-base-200 rounded-xl">
                  <h3 className="font-semibold mb-2">For Campaign Creators</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Provide truthful campaign information</li>
                    <li>Use funds for stated purposes</li>
                    <li>Update backers on progress</li>
                    <li>Honor reward commitments</li>
                  </ul>
                </div>
                <div className="p-4 bg-base-200 rounded-xl">
                  <h3 className="font-semibold mb-2">For Contributors</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Understand donation risks</li>
                    <li>Research campaigns before giving</li>
                    <li>Keep records of transactions</li>
                    <li>Report suspicious activity</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prohibited Activities */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoWarningOutline className="text-error" />
              Prohibited Activities
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create fraudulent or misleading campaigns</li>
                <li>Use the platform for illegal activities</li>
                <li>Impersonate others or provide false information</li>
                <li>Spam or harass other users</li>
                <li>Attempt to circumvent security measures</li>
                <li>Use automated tools to abuse the platform</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoDocumentTextOutline className="text-primary" />
              Intellectual Property
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                All content on SparkLift, including text, graphics, logos, images, and software, is the property of SparkLift 
                or its content suppliers and is protected by intellectual property laws.
              </p>
              <p>
                Users retain ownership of content they submit but grant SparkLift a license to use, display, and distribute such content 
                for the purpose of operating the platform.
              </p>
            </div>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoWarningOutline className="text-warning" />
              Limitation of Liability
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                SparkLift shall not be liable for any indirect, incidental, special, or consequential damages arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use or inability to use our services</li>
                <li>Unauthorized access to your account</li>
                <li>Errors or omissions in content</li>
                <li>Disputes between users</li>
                <li>Fraudulent campaigns or failed projects</li>
              </ul>
              <p className="text-sm text-base-content/60 mt-4">
                Contributions to campaigns are made at your own risk. SparkLift does not guarantee campaign outcomes or refund donations.
              </p>
            </div>
          </motion.div>

          {/* Privacy Policy */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoShieldCheckmarkOutline className="text-success" />
              Privacy Policy
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. 
                By using SparkLift, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              <p className="text-sm">
                We collect information you provide directly, such as when you create an account, make a contribution, or create a campaign. 
                We also collect information automatically about your use of our platform.
              </p>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoDocumentTextOutline className="text-secondary" />
              Termination
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                SparkLift reserves the right to terminate or suspend your account and access to the platform at our sole discretion, 
                without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <p>
                Upon termination, your right to use the platform will immediately cease. All provisions of the Terms which by their nature 
                should survive termination shall survive.
              </p>
            </div>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoInformationCircleOutline className="text-info" />
              Changes to Terms
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                SparkLift reserves the right to modify these terms at any time. We will notify users of material changes by posting 
                the new Terms on this page. Your continued use of the platform after such modifications constitutes your acceptance 
                of the new Terms.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <IoDocumentTextOutline className="text-primary" />
              Contact Us
            </h2>
            <div className="space-y-3 text-base-content/80">
              <p>
                If you have any questions about these Terms and Conditions, please contact us through:
              </p>
              <div className="p-4 bg-base-200 rounded-xl space-y-2">
                <p><strong>Email:</strong> support@sparklift.com</p>
                <p><strong>GitHub:</strong> github.com/HassanMahdee</p>
                <p><strong>Website:</strong> sparklift.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
