export const topSellingProductsConstant = [
  { name: "Latte", sales: 500, revenue: 2000, hasSuggestion: true },
  { name: "Cappuccino", sales: 400, revenue: 1600, hasSuggestion: false },
  { name: "Espresso", sales: 300, revenue: 900, hasSuggestion: false },
  { name: "Croissant", sales: 250, revenue: 625, hasSuggestion: false },
  { name: "Muffin", sales: 200, revenue: 400, hasSuggestion: true },
]

export const suggestionsConstant = {
  topProduct: {
    priority: "high",
    description:
      "Your top-selling product, Latte, is performing exceptionally well. Consider introducing seasonal variants or size options to further boost sales.",
  },
  lowestProduct: {
    priority: "medium",
    description:
      "Muffin sales are the lowest among top products. Try new flavors or promotional bundling to increase their popularity.",
  },
  peakHour: {
    priority: "high",
    description:
      "12PM is your peak hour. Ensure you're fully staffed and have a streamlined process to handle the lunch rush efficiently.",
  },
  slowestHour: {
    priority: "low",
    description:
      "6AM is your slowest hour. Consider adjusting opening hours or introducing an early bird special to attract more customers.",
  },
}

export const categoryPerformanceConstant = [
  { name: "Hot Drinks", value: 4000 },
  { name: "Cold Drinks", value: 3000 },
  { name: "Pastries", value: 2000 },
  { name: "Sandwiches", value: 1000 },
  { name: "Desserts", value: 500 },
]

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export const dailySalesPatternProductsConstant = [
  {
    hour: "6AM",
    Latte: 20,
    Cappuccino: 15,
    Espresso: 10,
    Croissant: 5,
    Muffin: 0,
  },
  {
    hour: "8AM",
    Latte: 50,
    Cappuccino: 40,
    Espresso: 30,
    Croissant: 20,
    Muffin: 10,
  },
  {
    hour: "10AM",
    Latte: 40,
    Cappuccino: 30,
    Espresso: 20,
    Croissant: 15,
    Muffin: 5,
  },
  {
    hour: "12PM",
    Latte: 60,
    Cappuccino: 50,
    Espresso: 40,
    Croissant: 30,
    Muffin: 20,
  },
  {
    hour: "2PM",
    Latte: 45,
    Cappuccino: 35,
    Espresso: 25,
    Croissant: 20,
    Muffin: 15,
  },
  {
    hour: "4PM",
    Latte: 30,
    Cappuccino: 25,
    Espresso: 15,
    Croissant: 10,
    Muffin: 5,
  },
  {
    hour: "6PM",
    Latte: 35,
    Cappuccino: 30,
    Espresso: 20,
    Croissant: 15,
    Muffin: 10,
  },
  {
    hour: "8PM",
    Latte: 25,
    Cappuccino: 20,
    Espresso: 15,
    Croissant: 10,
    Muffin: 5,
  },
]

export const dailySalesPatternCategoriesConstant = [
  {
    hour: "6AM",
    "Hot Drinks": 45,
    "Cold Drinks": 10,
    Pastries: 5,
    Sandwiches: 0,
    Desserts: 0,
  },
  {
    hour: "8AM",
    "Hot Drinks": 120,
    "Cold Drinks": 30,
    Pastries: 25,
    Sandwiches: 15,
    Desserts: 5,
  },
  {
    hour: "10AM",
    "Hot Drinks": 90,
    "Cold Drinks": 40,
    Pastries: 20,
    Sandwiches: 10,
    Desserts: 10,
  },
  {
    hour: "12PM",
    "Hot Drinks": 150,
    "Cold Drinks": 60,
    Pastries: 40,
    Sandwiches: 30,
    Desserts: 20,
  },
  {
    hour: "2PM",
    "Hot Drinks": 105,
    "Cold Drinks": 50,
    Pastries: 30,
    Sandwiches: 25,
    Desserts: 15,
  },
  {
    hour: "4PM",
    "Hot Drinks": 70,
    "Cold Drinks": 40,
    Pastries: 15,
    Sandwiches: 10,
    Desserts: 10,
  },
  {
    hour: "6PM",
    "Hot Drinks": 85,
    "Cold Drinks": 35,
    Pastries: 20,
    Sandwiches: 15,
    Desserts: 15,
  },
  {
    hour: "8PM",
    "Hot Drinks": 60,
    "Cold Drinks": 25,
    Pastries: 15,
    Sandwiches: 5,
    Desserts: 10,
  },
]
