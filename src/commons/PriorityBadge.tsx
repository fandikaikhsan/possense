type PriorityBadgeProps = {
  priority: string
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const colorMap: { [key: string]: string } = {
    high: "bg-purple-500",
    medium: "bg-yellow-500",
    low: "bg-blue-500",
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        colorMap[priority] || "bg-gray-500"
      } text-white`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
    </div>
  )
}

export default PriorityBadge
