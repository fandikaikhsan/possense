"use client"

import React, { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import SalesInfoCard from "@/cards/SalesInfoCard"
import SuggestionCard from "@/cards/SuggestionCard"

const Upload = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-800 shadow-md rounded-lg p-6">{children}</div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white">{children}</h2>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

const DashboardContainer = () => {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState({
    totalSales: 150000,
    averageOrderValue: 75,
    topSellingProduct: "Product A",
    todaySales: {
      total: 5200,
      quantity: 87,
      topSelling: "Product X",
      leastFavorite: "Product Y",
      hourlyData: [
        { hour: "9AM", sales: 500 },
        { hour: "10AM", sales: 800 },
        { hour: "11AM", sales: 1200 },
        { hour: "12PM", sales: 1000 },
        { hour: "1PM", sales: 900 },
        { hour: "2PM", sales: 800 },
      ],
    },
    monthlySales: {
      total: 150000,
      quantity: 2500,
      topSelling: "Product A",
      leastFavorite: "Product Z",
      data: [
        { name: "Jan", sales: 4000 },
        { name: "Feb", sales: 3000 },
        { name: "Mar", sales: 5000 },
        { name: "Apr", sales: 4500 },
        { name: "May", sales: 6000 },
        { name: "Jun", sales: 5500 },
      ],
    },
    suggestions: [
      {
        title: "Optimize Inventory",
        category: "operations",
        description:
          "Implement just-in-time inventory management to reduce carrying costs and improve cash flow.",
        percentage: 15,
      },
      {
        title: "Expand Product Line",
        category: "product",
        description:
          "Introduce complementary products to increase average order value and capture more market share.",
        percentage: 20,
      },
      {
        title: "Launch Referral Program",
        category: "marketing",
        description:
          "Create a customer referral program to acquire new customers at a lower cost and increase loyalty.",
        percentage: 10,
      },
      {
        title: "Automate Order Processing",
        category: "operations",
        description:
          "Implement an automated order processing system to reduce errors and improve fulfillment speed.",
        percentage: 12,
      },
    ],
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">POS Sense</h1>

      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-medium text-gray-400"
          htmlFor="file_input"
        >
          Upload POS Spreadsheet (CSV)
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file_input"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">CSV file (MAX. 10MB)</p>
            </div>
            <input
              id="file_input"
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <SalesInfoCard
                title="Total Sales"
                value={`$${analysis.monthlySales.total.toLocaleString()}`}
                color="text-green-400"
              />
              <SalesInfoCard
                title="Total Quantity"
                value={analysis.monthlySales.quantity.toLocaleString()}
                color="text-blue-400"
              />
              <SalesInfoCard
                title="Top Selling Product"
                value={analysis.monthlySales.topSelling}
                color="text-purple-400"
              />
              <SalesInfoCard
                title="Least Favorite Product"
                value={analysis.monthlySales.leastFavorite}
                color="text-red-400"
              />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysis.monthlySales.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <SalesInfoCard
                title="Total Sales"
                value={`$${analysis.todaySales.total.toLocaleString()}`}
                color="text-green-400"
              />
              <SalesInfoCard
                title="Total Quantity"
                value={analysis.todaySales.quantity.toLocaleString()}
                color="text-blue-400"
              />
              <SalesInfoCard
                title="Top Selling Product"
                value={analysis.todaySales.topSelling}
                color="text-purple-400"
              />
              <SalesInfoCard
                title="Least Favorite Product"
                value={analysis.todaySales.leastFavorite}
                color="text-red-400"
              />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.todaySales.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                    }}
                  />
                  <Bar dataKey="sales" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-8 text-white">
          Improvement Suggestions
        </h2>
        <div className="overflow-x-auto">
          <div className="flex pb-4">
            {analysis.suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                title={suggestion.title}
                category={suggestion.category}
                description={suggestion.description}
                percentage={suggestion.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
