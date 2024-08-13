"use client"

import React, { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

import {
  topSellingProductsConstant,
  suggestionsConstant,
  categoryPerformanceConstant,
  dailySalesPatternCategoriesConstant,
  dailySalesPatternProductsConstant,
  COLORS,
} from "@/constants/ProductConstant"
import AiSuggestionTip from "@/commons/AISuggestionTip"
import CustomBar from "@/commons/CustomBar"
import MetricItem from "@/commons/MetricItem"

type SuggestionProps = {
  priority: string
  description: string
}

type ShapeProps = {
  x: number
  y: number
  width: number
  height: number
}

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

const ProductContainer = () => {
  const [dateRange, setDateRange] = useState("last30Days")
  const [savedSuggestions, setSavedSuggestions] = useState<SuggestionProps[]>(
    []
  )
  const [selectedProduct, setSelectedProduct] = useState("All Products")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const saveSuggestion = (suggestion: SuggestionProps) => {
    setSavedSuggestions([...savedSuggestions, suggestion])
    console.log("Saved suggestion:", suggestion)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Product Insights</h1>

      <div className="mb-6">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded p-2"
        >
          <option value="last30Days">Last 30 Days</option>
          <option value="lastQuarter">Last Quarter</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricItem title="Total Sold Items" value="1,650" change={2} />
            <MetricItem title="Total Sales" value="$12,345" change={5} />
            <MetricItem title="Avg Ticket Size" value="$8.50" change={1} />
            <MetricItem title="Best Seller" value="Latte" change={17} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
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
                        if (data.name === "Latte" || data.name === "Muffin") {
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
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPerformanceConstant}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryPerformanceConstant.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  {/* <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "none",
                    }}
                  /> */}
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <AiSuggestionTip
                            suggestion={suggestionsConstant.lowestProduct}
                            onSave={saveSuggestion}
                          />
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Pattern - Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded p-2"
              >
                <option value="All Products">All Products</option>
                {topSellingProductsConstant.map((product) => (
                  <option key={product.name} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySalesPatternProductsConstant}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      color: "#ffffff",
                    }}
                  />
                  {selectedProduct === "All Products" ? (
                    topSellingProductsConstant.map((product, index) => (
                      <Line
                        key={product.name}
                        type="monotone"
                        dataKey={product.name}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))
                  ) : (
                    <Line
                      type="monotone"
                      dataKey={selectedProduct}
                      stroke={COLORS[0]}
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Pattern - Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded p-2"
              >
                <option value="All Categories">All Categories</option>
                {categoryPerformanceConstant.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySalesPatternCategoriesConstant}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      color: "#ffffff",
                    }}
                  />
                  {selectedCategory === "All Categories" ? (
                    categoryPerformanceConstant.map((category, index) => (
                      <Line
                        key={category.name}
                        type="monotone"
                        dataKey={category.name}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))
                  ) : (
                    <Line
                      type="monotone"
                      dataKey={selectedCategory}
                      stroke={COLORS[0]}
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductContainer
