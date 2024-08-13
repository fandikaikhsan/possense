"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { FiMenu, FiX, FiHome, FiBox, FiLogIn, FiLogOut } from "react-icons/fi"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This should be managed by your auth system

  const toggleNavbar = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "Product", icon: FiBox, path: "/product" },
  ]

  return (
    <>
      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white z-50"
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">POS Sense</h1>
          <button onClick={toggleNavbar}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4"
          >
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <div
                  className={`block py-2 ${
                    pathName === item.path ? "text-blue-400" : ""
                  }`}
                >
                  <item.icon className="inline-block mr-2" />
                  {item.name}
                </div>
              </Link>
            ))}
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="w-full text-left py-2"
            >
              {isLoggedIn ? (
                <>
                  <FiLogOut className="inline-block mr-2" /> Logout
                </>
              ) : (
                <>
                  <FiLogIn className="inline-block mr-2" /> Login
                </>
              )}
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* Desktop Navbar */}
      <motion.nav
        initial={{ x: 200 }}
        animate={{ x: isOpen ? 0 : 200 }}
        className="hidden md:block fixed top-0 right-0 h-full bg-gray-900 text-white z-50 w-64 transition-all duration-300"
      >
        <div className="p-4 mt-20">
          {isOpen && (
            <Link href={"/"} onClick={() => setIsOpen(false)}>
              <h1 className="text-xl font-bold mb-8">POS Sense</h1>
            </Link>
          )}

          <button
            onClick={toggleNavbar}
            className="absolute top-4 left-2 bg-gray-700 p-2 rounded-full"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <div
                  className={`block py-2 ${
                    pathName === item.path ? "text-blue-400" : ""
                  }`}
                >
                  <item.icon className="inline-block mr-2" />
                  {isOpen && item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="w-full text-left py-2"
          >
            {isLoggedIn ? (
              <>
                <FiLogOut className="inline-block mr-2" />
                {isOpen && "Logout"}
              </>
            ) : (
              <>
                <FiLogIn className="inline-block mr-2" />
                {isOpen && "Login"}
              </>
            )}
          </button>
        </div>
      </motion.nav>
    </>
  )
}

export default Navbar
