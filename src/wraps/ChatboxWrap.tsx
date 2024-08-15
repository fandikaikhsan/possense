import React, { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Dummy data for AI responses
const dummyResponses = [
  {
    summary: [
      "Peak hours are between 7-9 AM and 2-4 PM",
      "Lattes are the top-selling item",
      "30% of transactions come from repeat customers",
    ],
    keyInsight:
      "Morning rush and afternoon pick-me-up drive sales, with a loyal customer base preferring lattes.",
    graphData: [
      { hour: "6AM", sales: 20 },
      { hour: "8AM", sales: 80 },
      { hour: "10AM", sales: 40 },
      { hour: "12PM", sales: 30 },
      { hour: "2PM", sales: 60 },
      { hour: "4PM", sales: 40 },
      { hour: "6PM", sales: 30 },
    ],
  },
  {
    summary: [
      "20% increase in hot beverage sales from November to February",
      "Weekday sales are 15% higher than weekend sales",
      "Average transaction value is $7.50",
    ],
    keyInsight:
      "Seasonal trends and workweek patterns significantly influence sales, with customers typically spending around $7.50 per visit.",
    graphData: [
      { month: "Jan", sales: 4000 },
      { month: "Feb", sales: 3800 },
      { month: "Mar", sales: 3200 },
      { month: "Apr", sales: 2800 },
      { month: "May", sales: 2600 },
      { month: "Jun", sales: 2400 },
    ],
  },
  {
    summary: [
      "40% of coffee buyers also purchase a pastry",
      "'Happy Hour' promotion increased afternoon sales by 25%",
      "70% of transactions use credit/debit cards",
    ],
    keyInsight:
      "Product pairings and targeted promotions drive sales growth, with a clear preference for card payments.",
    graphData: [
      { category: "Coffee", sales: 4000 },
      { category: "Pastry", sales: 3000 },
      { category: "Cold Drinks", sales: 2000 },
      { category: "Sandwiches", sales: 1500 },
      { category: "Merchandise", sales: 500 },
    ],
  },
]

const AIChatBox: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean; response?: any }>
  >([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState({
    summary: [],
    keyInsight: "",
    graphData: [],
  })

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "What are our peak sales hours and top products?",
    "How do seasonal trends affect our sales?",
    "What are our most effective sales strategies?",
  ]

  const handleSend = (text: string) => {
    if (text.trim() === "") return

    setMessages((prev) => [...prev, { text, isUser: true }])
    setInputText("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response =
        dummyResponses[Math.floor(Math.random() * dummyResponses.length)]
      setMessages((prev) => [...prev, { text: "", isUser: false, response }])
      setIsTyping(false)
      animateResponse(response)
    }, 1000)
  }

  const animateResponse = (response: any) => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedResponse({
        summary: response.summary.slice(0, i),
        keyInsight: response.keyInsight.slice(0, i * 5),
        graphData: response.graphData,
      })
      i++
      if (
        i > Math.max(response.summary.length, response.keyInsight.length / 5)
      ) {
        clearInterval(interval)
      }
    }, 50)
  }

  const smoothScrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight
      const height = chatContainerRef.current.clientHeight
      const maxScrollTop = scrollHeight - height

      chatContainerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    if (!isTyping) {
      setDisplayedResponse({ summary: [], keyInsight: "", graphData: [] })
    }
  }, [isTyping])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping, displayedResponse])

  useEffect(() => {
    smoothScrollToBottom()
  }, [messages, isTyping, displayedResponse])

  return (
    <div className="flex flex-col h-[40rem] rounded-lg w-full mx-auto bg-gray-700 p-4">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 scroll-smooth"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {message.isUser ? (
              <div className="text-sm max-w-sm p-3 rounded-lg bg-blue-500 text-white">
                {message.text}
              </div>
            ) : (
              <div className="text-sm p-8 w-[80%] xl:w-[60%] rounded-lg bg-gray-900">
                <h3 className="font-bold mb-2">Summary:</h3>
                <ul className="list-disc pl-5 mb-5">
                  {message.response.summary.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <h3 className="font-bold mb-2">Key Insight:</h3>
                <p className="mb-8">{message.response.keyInsight}</p>
                <h3 className="font-bold mb-5">Data Visualization:</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={message.response.graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey={Object.keys(message.response.graphData[0])[0]}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={Object.keys(message.response.graphData[0])[1]}
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="text-sm flex justify-start w-[80%] xl:w-[60%]">
            <div className="w-full p-5 rounded-lg bg-gray-900">
              <h3 className="font-bold mb-2">Summary:</h3>
              <ul className="list-disc pl-5 mb-3">
                {displayedResponse.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <h3 className="font-bold mb-2">Key Insight:</h3>
              <p className="mb-3">
                {displayedResponse.keyInsight}
                <span className="animate-pulse">▋</span>
              </p>
              {displayedResponse.graphData.length > 0 && (
                <div className="flex flex-col gap-2 justify-center items-center h-32 bg-gray-500 animate-pulse">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-b-2 border-gray-900"></div>
                  </div>
                  <div className="text-gray-900 animate-pulse">
                    Generating data visualization...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-2 mb-4">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleSend(question)}
            className="px-4 py-3 text-xs bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          disabled={true}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend(inputText)}
          placeholder="Type your message... (disabled)"
          className="flex-1 p-2 bg-gray-400 placeholder-gray-500 text-black rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => handleSend(inputText)}
          className="bg-gray-300 h-full text-gray-400 p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

export default AIChatBox
