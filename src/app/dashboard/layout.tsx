import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/navs/Navbar"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "POS Sense",
  description: "Make data driven decisions for your business.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <div className="flex bg-gray-100">
        <Navbar />
        <div className="flex-grow  md:ml-16">
          {" "}
          {/* Adjust padding as needed */}
          <body className={inter.className}>{children}</body>
        </div>
      </div>
    </html>
  )
}
