"use client"

import React, { createContext } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          POS Sense
        </motion.div>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </motion.button>
        </Link>
      </nav>

      <header className="container mx-auto px-6 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          Leverage Success with Data-Driven Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl mb-8"
        >
          Empower your business with AI-powered analytics to boost sales and
          delight customers
        </motion.p>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg"
          >
            Start Your Free Trial
          </motion.button>
        </Link>
      </header>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Analytics",
              description:
                "Get instant insights into your business's performance with our dynamic dashboard.",
              icon: "📊",
            },
            {
              title: "AI-Powered Suggestions",
              description:
                "Receive intelligent recommendations to optimize your menu and operations.",
              icon: "🤖",
            },
            {
              title: "Easy Integration",
              description:
                "Seamlessly connect with your existing POS system for hassle-free data analysis.",
              icon: "🔗",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          Join Hundreds of Thriving Business
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto"
        >
          <p className="text-lg italic mb-4">
            &quot;POS Sense has transformed our business. We&apos;ve seen a 20%
            increase in sales and our customers love our new menu items!&quot;
          </p>
          <p className="font-bold">- Akbar, Owner of Kopi Santai.</p>
        </motion.div>
      </section>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Fandika and Titus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
