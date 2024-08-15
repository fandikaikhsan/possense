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
import Chatbox from "@/wraps/ChatboxWrap"
import AiSuggestionTip from "@/commons/AISuggestionTip"
import CustomBar from "@/commons/CustomBar"
import {
  topSellingProductsConstant,
  suggestionsConstant,
} from "@/constants/ProductConstant"
import MetricItem from "@/commons/MetricItem"

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
  <h2 className="text-lg font-semibold text-white">{children}</h2>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

type SuggestionProps = {
  priority: string
  description: string
}

const DashboardContainer = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analyzeFile, setAnalyzeFile] = useState(false)
  const [savedSuggestions, setSavedSuggestions] = useState<SuggestionProps[]>(
    []
  )

  const saveSuggestion = (suggestion: SuggestionProps) => {
    setSavedSuggestions([...savedSuggestions, suggestion])
    console.log("Saved suggestion:", suggestion)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setUploadComplete(true)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

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

  return (
    <div className="container mx-auto lg:p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">POS Sense</h1>

      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-medium text-gray-400"
          htmlFor="file_input"
        >
          Upload POS Spreadsheet (CSV)
        </label>
        <div className="flex items-center justify-center w-full">
          {!file ? (
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
          ) : uploadComplete && file ? (
            <div className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>File Uploaded</CardTitle>
                  <div className="text-sm text-gray-400">{file.name}</div>
                </CardHeader>
                <div className="flex flex-col gap-2 md:flex-row md:justify-start justify-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 text-xs rounded-lg"
                    onClick={() => {
                      setFile(null)
                      setUploadComplete(false)
                      setUploadProgress(0)
                      setAnalyzeFile(false)
                    }}
                  >
                    Upload Another File
                  </button>

                  <button
                    className="bg-blue-500 text-white px-4 py-2 text-xs rounded-lg ml-2"
                    onClick={() => setAnalyzeFile(true)}
                  >
                    Analyze File
                  </button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="w-full">
              <Card>
                <p className="mb-2">Uploading: {file.name}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="mt-2">{uploadProgress}% uploaded</p>
              </Card>
            </div>
          )}
        </div>
      </div>

      {analyzeFile && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col justify-between bg-gray-800 shadow-md rounded-lg p-6">
              <div className="mb-10">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricItem
                      title="Total Sold Items"
                      value="1,650"
                      change={2}
                    />
                    <MetricItem
                      title="Total Sales"
                      value="$12,345"
                      change={5}
                    />
                    <MetricItem
                      title="Avg Ticket Size"
                      value="$8.50"
                      change={1}
                    />
                    <MetricItem title="Best Seller" value="Latte" change={17} />
                  </div>
                </CardContent>
              </div>
              <div className="">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topSellingProductsConstant}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              if (
                                data.name === "Latte" ||
                                data.name === "Muffin"
                              ) {
                                return (
                                  <AiSuggestionTip
                                    suggestion={
                                      data.name === "Latte"
                                        ? suggestionsConstant.topProduct
                                        : suggestionsConstant.lowestProduct
                                    }
                                    onSave={saveSuggestion}
                                  />
                                )
                              }
                            }
                            return null
                          }}
                        />
                        <Bar
                          dataKey="sales"
                          shape={(props: any) => {
                            const { x, y, width, height, payload } = props
                            return (
                              <CustomBar
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                hasSuggestion={
                                  payload.name === "Latte" ||
                                  payload.name === "Muffin"
                                }
                              />
                            )
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </div>
            </div>
            {/* <Card>
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
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-8">
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
          </div>
          <div className="flex flex-col gap-3">
            <CardTitle>Ask Your Assistance</CardTitle>
            <Chatbox />
          </div>
          <div className="mt-10 mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-white">
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
        </>
      )}
    </div>
  )
}

export default DashboardContainer
